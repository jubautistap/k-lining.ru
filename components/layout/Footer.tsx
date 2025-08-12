import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Уборка квартир', href: '/services/apartment-cleaning' },
    { name: 'Уборка домов', href: '/services/house-cleaning' },
    { name: 'Уборка офисов', href: '/services/office-cleaning' },
    { name: 'Генеральная уборка офисов', href: '/services/office-cleaning/general-cleaning' },
    { name: 'Уборка после ремонта', href: '/services/post-renovation-cleaning' },
    { name: 'Химчистка мебели', href: '/services/furniture-dry-cleaning' },
    { name: 'Мытье окон', href: '/services/window-cleaning' },
    { name: 'Дезинфекция', href: '/services/disinfection' },
  ];

  const company = [
    { name: 'О компании', href: '/about' },
    // Скрываем пока страницы не готовы
    // { name: 'Наша команда', href: '/about/team' },
    // { name: 'Вакансии', href: '/careers' },
    { name: 'Блог', href: '/blog' },
  ];

  const supportLinks = [
    { name: 'Контакты', href: '/contacts' },
    { name: 'Часто задаваемые вопросы', href: '/faq' },
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Условия использования', href: '/terms' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-white">
                K-lining
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Профессиональная клининговая компания в Москве и МО. Обслуживаем Басманный, Тверской, Таганский, 
              Красносельский и другие районы ЦАО. Делаем уборку быстро, качественно и честно. 
              Работаем 24/7 для вашего комфорта.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Shield className="w-4 h-4" />
                <span>Гарантия качества</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Услуги</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Компания</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white font-medium">+7 (925) 555-18-33</p>
                  <p className="text-gray-400 text-sm">24/7 поддержка</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white font-medium">info@k-lining.ru</p>
                  <p className="text-gray-400 text-sm">Электронная почта</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white font-medium">Москва и МО</p>
                  <p className="text-gray-400 text-sm">Работаем по всей области</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white font-medium">Круглосуточно</p>
                  <p className="text-gray-400 text-sm">Без выходных</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Поддержка</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {currentYear} K-lining. Все права защищены.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 