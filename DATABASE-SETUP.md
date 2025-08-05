# 💾 **НАСТРОЙКА БАЗЫ ДАННЫХ PostgreSQL**

## 🚀 **БЫСТРЫЙ СТАРТ**

### **1. Установка PostgreSQL**

#### **macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

#### **Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### **Windows:**
- Скачать с [postgresql.org](https://www.postgresql.org/download/windows/)
- Запустить установщик

---

### **2. Создание базы данных**

```bash
# Подключиться к PostgreSQL как суперпользователь
sudo -u postgres psql

# В PostgreSQL консоли:
CREATE USER klining_user WITH PASSWORD 'klining_password';
CREATE DATABASE klining_db OWNER klining_user;
GRANT ALL PRIVILEGES ON DATABASE klining_db TO klining_user;
\q
```

---

### **3. Настройка переменных окружения**

Скопируйте `.env.example` в `.env.local` и настройте:

```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```env
DATABASE_URL="postgresql://klining_user:klining_password@localhost:5432/klining_db?schema=public"
JWT_SECRET="ваш-уникальный-секретный-ключ-минимум-32-символа"
JWT_REFRESH_SECRET="другой-уникальный-ключ-для-refresh-токенов"
```

---

### **4. Миграция и заполнение данными**

```bash
# Применить миграции
npm run db:migrate

# Заполнить начальными данными
npm run db:seed

# Открыть Prisma Studio (опционально)
npm run db:studio
```

---

## 🔑 **УЧЕТНЫЕ ЗАПИСИ ПО УМОЛЧАНИЮ**

После выполнения `npm run db:seed`:

### **Администратор:**
- **Email:** admin@k-lining.ru
- **Пароль:** admin123
- **Роль:** ADMIN

### **Менеджер:**
- **Email:** manager@k-lining.ru  
- **Пароль:** manager123
- **Роль:** MANAGER

---

## 📊 **ПОЛЕЗНЫЕ КОМАНДЫ**

```bash
# Работа с базой данных
npm run db:generate    # Генерирует Prisma клиент
npm run db:push        # Быстрая синхронизация схемы (dev only)
npm run db:migrate     # Создать миграцию
npm run db:seed        # Заполнить данными
npm run db:studio      # Открыть веб-интерфейс БД
npm run db:reset       # Сбросить БД (удалит все данные!)

# Prisma консоль
npx prisma studio      # Веб-интерфейс для просмотра данных
npx prisma migrate dev # Создать и применить миграцию
npx prisma db push     # Синхронизировать схему без миграций
```

---

## 🔄 **МОДЕЛИ БАЗЫ ДАННЫХ**

### **User (Пользователи)**
- Администраторы и менеджеры системы
- Роли: ADMIN, MANAGER, EDITOR
- Безопасное хранение паролей (bcrypt)

### **Lead (Лиды)**
- Заявки от клиентов
- Статусы: NEW → CONTACTED → QUALIFIED → QUOTED → WON/LOST
- Привязка к ответственному менеджеру

### **Order (Заказы)**
- Подтвержденные заказы от лидов
- Детали услуги (тип, площадь, цена)
- Статусы выполнения

### **BlogPost (Статьи блога)**
- SEO-оптимизированные статьи
- Мета-теги для поисковых систем
- Статусы публикации

### **Settings (Настройки)**
- Конфигурация сайта
- Контактная информация
- Параметры интеграций

---

## 🔧 **TROUBLESHOOTING**

### **Ошибка подключения к БД:**
```bash
# Проверить статус PostgreSQL
sudo systemctl status postgresql

# Перезапустить
sudo systemctl restart postgresql
```

### **Ошибка прав доступа:**
```sql
-- В psql консоли
GRANT ALL PRIVILEGES ON DATABASE klining_db TO klining_user;
GRANT ALL ON SCHEMA public TO klining_user;
```

### **Сбросить БД полностью:**
```bash
npm run db:reset
npm run db:seed
```

---

## 🚀 **ПРОДАКШН**

Для продакшн-сервера обновите переменные:

```env
DATABASE_URL="postgresql://prod_user:secure_password@prod_host:5432/klining_prod"
JWT_SECRET="crypto-strong-secret-for-production-64-chars-minimum"
JWT_REFRESH_SECRET="another-crypto-strong-secret-for-refresh-tokens"
```

**⚠️ Важно:** Никогда не коммитьте `.env.local` в git!