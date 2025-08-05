# 🔐 **ПЛАН: БЕЗОПАСНОСТЬ + БАЗА ДАННЫХ**
*Критичные улучшения для продакшн-готовности*

---

## 📋 **ЭТАПЫ РЕАЛИЗАЦИИ**

### **🏗️ ЭТАП 1: НАСТРОЙКА БАЗЫ ДАННЫХ (День 1-2)**

#### **1.1 Установка PostgreSQL + Prisma**
```bash
# Установка зависимостей
npm install prisma @prisma/client
npm install -D prisma

# Инициализация Prisma
npx prisma init
```

#### **1.2 Схема базы данных**
```sql
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password_hash String
  name          String
  role          Role     @default(MANAGER)
  status        Status   @default(ACTIVE)
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  last_login    DateTime?
  
  // Связи
  leads         Lead[]
  blog_posts    BlogPost[]
  
  @@map("users")
}

model Lead {
  id            String      @id @default(cuid())
  name          String?
  phone         String
  email         String?
  service       String
  message       String?
  status        LeadStatus  @default(NEW)
  source        String      @default("website")
  price         Float?
  created_at    DateTime    @default(now())
  updated_at    DateTime    @updatedAt
  
  // Связи
  assigned_to   User?       @relation(fields: [user_id], references: [id])
  user_id       String?
  orders        Order[]
  
  @@map("leads")
}

model Order {
  id              String      @id @default(cuid())
  lead_id         String
  service_type    String
  rooms           Int?
  area            Float?
  price           Float
  status          OrderStatus @default(PENDING)
  scheduled_at    DateTime?
  completed_at    DateTime?
  notes           String?
  created_at      DateTime    @default(now())
  updated_at      DateTime    @updatedAt
  
  // Связи
  lead            Lead        @relation(fields: [lead_id], references: [id])
  
  @@map("orders")
}

model BlogPost {
  id           String   @id @default(cuid())
  title        String
  slug         String   @unique
  content      String
  excerpt      String?
  status       PostStatus @default(DRAFT)
  published_at DateTime?
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt
  
  // SEO поля
  meta_title       String?
  meta_description String?
  keywords         String?
  
  // Связи
  author       User     @relation(fields: [author_id], references: [id])
  author_id    String
  
  @@map("blog_posts")
}

model Settings {
  id         String   @id @default(cuid())
  key        String   @unique
  value      String
  updated_at DateTime @updatedAt
  
  @@map("settings")
}

enum Role {
  ADMIN
  MANAGER
  EDITOR
}

enum Status {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  QUOTED
  WON
  LOST
}

enum OrderStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

#### **1.3 Переменные окружения**
```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/klining_db"
JWT_SECRET="super-secret-jwt-key-32-chars-min"
JWT_REFRESH_SECRET="super-secret-refresh-key-32-chars"
NEXTAUTH_SECRET="nextauth-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

---

### **🔑 ЭТАП 2: JWT АВТОРИЗАЦИЯ (День 2-3)**

#### **2.1 Утилиты JWT**
```typescript
// lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  static generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
  }
  
  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch {
      return null;
    }
  }
  
  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
    } catch {
      return null;
    }
  }
  
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
```

#### **2.2 Middleware авторизации**
```typescript
// lib/auth/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './jwt';

export function withAuth(handler: Function, allowedRoles?: string[]) {
  return async (request: NextRequest) => {
    try {
      const token = request.cookies.get('access_token')?.value;
      
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      const payload = AuthService.verifyAccessToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }
      
      if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
      
      // Добавляем пользователя в context
      (request as any).user = payload;
      
      return handler(request);
    } catch (error) {
      return NextResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    }
  };
}
```

#### **2.3 API авторизации**
```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth/jwt';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);
    
    // Найти пользователя
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password_hash: true,
        name: true,
        role: true,
        status: true,
      },
    });
    
    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Проверить пароль
    const isValid = await AuthService.verifyPassword(
      password,
      user.password_hash
    );
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Генерировать токены
    const tokens = AuthService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    
    // Обновить last_login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });
    
    // Установить cookies
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
    
    response.cookies.set('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 минут
    });
    
    response.cookies.set('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
```

---

### **🛡️ ЭТАП 3: SECURITY FEATURES (День 3-4)**

#### **3.1 Rate Limiting**
```typescript
// lib/security/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options: Options = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      return { isRateLimited, remaining: limit - currentUsage };
    },
  };
}

// Использование в API
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Limit each IP to 500 requests per interval
});

export async function applyRateLimit(request: NextRequest, limit: number = 10) {
  const ip = request.ip ?? '127.0.0.1';
  const { isRateLimited } = limiter.check(limit, ip);
  
  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  return null;
}
```

#### **3.2 CSRF Protection**
```typescript
// lib/security/csrf.ts
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export class CSRFProtection {
  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  
  static verifyToken(request: NextRequest, sessionToken: string): boolean {
    const headerToken = request.headers.get('x-csrf-token');
    const bodyToken = request.headers.get('x-csrf-token');
    
    return headerToken === sessionToken || bodyToken === sessionToken;
  }
}
```

---

### **📦 ЭТАП 4: МИГРАЦИЯ ДАННЫХ (День 4-5)**

#### **4.1 Seed данные**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../lib/auth/jwt';

const prisma = new PrismaClient();

async function main() {
  // Создать админа
  const adminPasswordHash = await AuthService.hashPassword('admin123');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@k-lining.ru' },
    update: {},
    create: {
      email: 'admin@k-lining.ru',
      password_hash: adminPasswordHash,
      name: 'Администратор',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  
  // Создать настройки
  const settings = [
    { key: 'site_name', value: 'K-lining' },
    { key: 'contact_phone', value: '+7 (925) 555-18-33' },
    { key: 'contact_email', value: 'info@k-lining.ru' },
    { key: 'working_hours', value: '24/7' },
  ];
  
  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  
  console.log('✅ Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

#### **4.2 Миграция существующих данных**
```typescript
// scripts/migrate-mockdata.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Перенести данные из компонентов в БД
async function migrateMockData() {
  // Примеры лидов из админки
  const mockLeads = [
    {
      name: 'Анна Петрова',
      phone: '+7 (925) 123-45-67',
      email: 'anna@example.com',
      service: 'Генеральная уборка',
      status: 'NEW' as const,
      source: 'website',
    },
    // ... добавить другие
  ];
  
  for (const lead of mockLeads) {
    await prisma.lead.create({ data: lead });
  }
  
  console.log('✅ Mock data migrated');
}
```

---

## 🚀 **ПЛАН РЕАЛИЗАЦИИ ПО ДНЯМ**

### **ДЕНЬ 1: Настройка инфраструктуры**
- [ ] Установить PostgreSQL локально
- [ ] Настроить Prisma + схему БД
- [ ] Создать миграции
- [ ] Настроить .env переменные

### **ДЕНЬ 2: JWT авторизация** 
- [ ] Создать AuthService утилиты
- [ ] API login/logout endpoints
- [ ] Middleware для проверки токенов
- [ ] HttpOnly cookies для безопасности

### **ДЕНЬ 3: Security features**
- [ ] Rate limiting middleware
- [ ] CSRF protection
- [ ] Валидация входных данных (Zod)
- [ ] Логирование безопасности

### **ДЕНЬ 4: Интеграция с админкой**
- [ ] Обновить компоненты админки
- [ ] Подключить реальные API
- [ ] Убрать mock данные
- [ ] Тестирование функций

### **ДЕНЬ 5: Тестирование и отладка**
- [ ] Unit тесты для AuthService
- [ ] Интеграционные тесты API
- [ ] Проверка безопасности
- [ ] Документация API

---

## 💰 **ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ**

### **🔐 Безопасность:**
- ✅ JWT токены в HttpOnly cookies
- ✅ Защита от CSRF атак  
- ✅ Rate limiting API
- ✅ Роли и права доступа
- ✅ Безопасное хранение паролей

### **💾 База данных:**
- ✅ PostgreSQL с Prisma ORM
- ✅ Типизированные запросы
- ✅ Автоматические миграции
- ✅ Seed данные для разработки
- ✅ Backup/restore процедуры

---

**🎯 Готов начинать? Какой этап хочешь реализовать первым?**