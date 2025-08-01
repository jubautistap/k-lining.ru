# Настройка AmoCRM для KliningPro

## 🔧 Шаг 1: Создание интеграции в AmoCRM

1. **Войдите в AmoCRM** (https://your-domain.amocrm.ru)
2. **Перейдите в настройки** → Интеграции → API
3. **Создайте интеграцию:**
   - Название: `KliningPro Website`
   - Описание: `Интеграция с сайтом для сбора лидов`
   - Права доступа: `leads:write`, `contacts:write`

## 🔑 Шаг 2: Получение токенов

После создания интеграции получите:
- **Client ID** (идентификатор клиента)
- **Client Secret** (секретный ключ)
- **Authorization Code** (код авторизации)
- **Access Token** (токен доступа)
- **Refresh Token** (токен обновления)

## ⚙️ Шаг 3: Настройка переменных окружения

Создайте файл `.env.local`:

```env
# AmoCRM настройки
AMOCRM_DOMAIN=your-domain.amocrm.ru
AMOCRM_CLIENT_ID=your-client-id
AMOCRM_CLIENT_SECRET=your-client-secret
AMOCRM_ACCESS_TOKEN=your-access-token
AMOCRM_REFRESH_TOKEN=your-refresh-token

# Дополнительные настройки
AMOCRM_PIPELINE_ID=your-pipeline-id
AMOCRM_STATUS_ID=your-status-id
AMOCRM_RESPONSIBLE_USER_ID=your-user-id
```

## 🔄 Шаг 4: Обновление API роута

Замените содержимое `/app/api/amo-crm/lead/route.ts` на реальную интеграцию:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // Валидация
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Создание контакта в AmoCRM
    const contactData = {
      name: name,
      custom_fields_values: [
        {
          field_id: 123456, // ID поля телефона
          values: [{ value: phone, enum_code: 'WORK' }]
        },
        {
          field_id: 123457, // ID поля email
          values: [{ value: email || '' }]
        }
      ]
    };

    const contactResponse = await fetch(
      `https://${process.env.AMOCRM_DOMAIN}/api/v4/contacts`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([contactData])
      }
    );

    if (!contactResponse.ok) {
      throw new Error('Failed to create contact');
    }

    const contacts = await contactResponse.json();
    const contactId = contacts._embedded.contacts[0].id;

    // Создание сделки
    const leadData = {
      name: `Заявка с сайта: ${service || 'Уборка'}`,
      price: 0,
      pipeline_id: parseInt(process.env.AMOCRM_PIPELINE_ID || '0'),
      status_id: parseInt(process.env.AMOCRM_STATUS_ID || '0'),
      responsible_user_id: parseInt(process.env.AMOCRM_RESPONSIBLE_USER_ID || '0'),
      _embedded: {
        contacts: [{ id: contactId }]
      },
      custom_fields_values: [
        {
          field_id: 123458, // ID поля услуга
          values: [{ value: service || '' }]
        },
        {
          field_id: 123459, // ID поля сообщение
          values: [{ value: message || '' }]
        },
        {
          field_id: 123460, // ID поля источник
          values: [{ value: 'website' }]
        }
      ]
    };

    const leadResponse = await fetch(
      `https://${process.env.AMOCRM_DOMAIN}/api/v4/leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([leadData])
      }
    );

    if (!leadResponse.ok) {
      throw new Error('Failed to create lead');
    }

    const leads = await leadResponse.json();
    const leadId = leads._embedded.leads[0].id;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена в AmoCRM',
        leadId: leadId,
        contactId: contactId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки в AmoCRM' },
      { status: 500 }
    );
  }
}
```

## 🧪 Шаг 5: Тестирование

1. **Запустите сайт:** `npm run dev`
2. **Откройте сайт** и заполните форму
3. **Проверьте в AmoCRM** - должна появиться новая сделка

## 📊 Шаг 6: Настройка воронки

В AmoCRM создайте воронку:
1. **Новые заявки** (статус: "Новая заявка")
2. **В работе** (статус: "Обрабатывается")
3. **Подтверждено** (статус: "Подтверждено")
4. **Выполнено** (статус: "Завершено")
5. **Отменено** (статус: "Отменено")

## 🔄 Шаг 7: Автообновление токенов

Создайте API роут для обновления токенов:

```typescript
// /app/api/amo-crm/refresh/route.ts
export async function POST() {
  try {
    const response = await fetch(
      `https://${process.env.AMOCRM_DOMAIN}/oauth2/access_token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AMOCRM_CLIENT_ID,
          client_secret: process.env.AMOCRM_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: process.env.AMOCRM_REFRESH_TOKEN
        })
      }
    );

    const data = await response.json();
    
    // Обновите токены в базе данных или переменных окружения
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}
```

## ⚠️ Важные моменты

1. **Безопасность:** Никогда не коммитьте токены в Git
2. **Лимиты:** AmoCRM имеет лимиты на API запросы
3. **Обработка ошибок:** Всегда обрабатывайте ошибки API
4. **Логирование:** Ведите логи всех запросов
5. **Тестирование:** Тестируйте на staging окружении 