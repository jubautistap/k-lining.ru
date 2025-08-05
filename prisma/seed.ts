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
  
  console.log('✅ Создан администратор:', admin.email);
  
  // Создать менеджера
  const managerPasswordHash = await AuthService.hashPassword('manager123');
  
  const manager = await prisma.user.upsert({
    where: { email: 'manager@k-lining.ru' },
    update: {},
    create: {
      email: 'manager@k-lining.ru',
      password_hash: managerPasswordHash,
      name: 'Менеджер',
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  });
  
  console.log('✅ Создан менеджер:', manager.email);
  
  // Создать настройки
  const settings = [
    { key: 'site_name', value: 'K-lining' },
    { key: 'contact_phone', value: '+7 (925) 555-18-33' },
    { key: 'contact_email', value: 'info@k-lining.ru' },
    { key: 'working_hours', value: '24/7' },
    { key: 'company_address', value: 'ул. Бакунинская, 69, стр. 1, Москва' },
    { key: 'default_service_price', value: '3000' },
  ];
  
  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  
  console.log('✅ Созданы настройки:', settings.length);
  
  // Создать тестовые лиды
  const testLeads = [
    {
      name: 'Анна Петрова',
      phone: '+7 (925) 123-45-67',
      email: 'anna@example.com',
      service: 'Генеральная уборка',
      message: 'Нужна генеральная уборка 2-комнатной квартиры',
      status: 'NEW' as const,
      source: 'website',
      user_id: admin.id,
    },
    {
      name: 'Максим Сидоров',
      phone: '+7 (925) 234-56-78',
      email: 'maxim@example.com',
      service: 'Уборка офиса',
      message: 'Регулярная уборка офиса 100 кв.м',
      status: 'CONTACTED' as const,
      source: 'phone',
      user_id: manager.id,
    },
    {
      name: 'Елена Иванова',
      phone: '+7 (925) 345-67-89',
      service: 'Химчистка дивана',
      message: 'Химчистка дивана на дому',
      status: 'QUALIFIED' as const,
      source: 'whatsapp',
      user_id: admin.id,
    },
  ];
  
  for (const lead of testLeads) {
    await prisma.lead.create({ data: lead });
  }
  
  console.log('✅ Созданы тестовые лиды:', testLeads.length);
  
  console.log('\n🎉 Seed данные успешно созданы!');
  console.log('📧 Админ: admin@k-lining.ru / admin123');
  console.log('📧 Менеджер: manager@k-lining.ru / manager123');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка seed данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });