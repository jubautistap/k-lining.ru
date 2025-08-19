'use client';

import { motion } from 'framer-motion';
import { Home, Building, Sparkles, Sun, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import OpenWizardButton from '@/components/ui/OpenWizardButton';

export default function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Уборка квартир',
      description: 'Поддерживающая, генеральная и после ремонта. Делаем качественно и быстро.',
          features: ['Пылесосим', 'Моем полы', 'Убираем санузел', 'Протираем пыль'],
          price: 'от 6,000 ₽',
      href: '/services/apartment-cleaning'
    },
    {
      icon: Building,
      title: 'Уборка домов',
      description: 'Коттеджи, таунхаусы, дачи. Специализируемся на больших площадях.',
      features: ['Все помещения', 'Моем окна', 'Убираем участок', 'Химчистка мебели'],
      price: 'от 5,000 ₽',
      href: '/services/house-cleaning'
    },
    {
      icon: Building,
      title: 'Уборка офисов',
      description: 'Коммерческие помещения любого размера. Работаем в нерабочее время.',
      features: ['Офисные помещения', 'Переговорные', 'Кухни и санузлы', 'Ресепшн'],
          price: 'от 5,000 ₽',
      href: '/services/office-cleaning'
    },
    {
      icon: Sparkles,
      title: 'Химчистка',
      description: 'Профессиональная чистка мебели, ковров, матрасов и текстиля.',
      features: ['Диваны и кресла', 'Ковры и ковролин', 'Матрасы', 'Шторы'],
      price: 'от 1,000 ₽',
      href: '/services/dry-cleaning'
    },
    {
      icon: Sun,
      title: 'Мытье окон',
      description: 'Внутри и снаружи. Работаем на высоте с профессиональным оборудованием.',
      features: ['Внутренние окна', 'Внешние окна', 'Балконы', 'Витражи'],
          price: 'от 600 ₽ за створку',
      href: '/services/window-cleaning'
    },
    {
      icon: Shield,
      title: 'После ремонта',
      description: 'Убираем строительную пыль и мусор. Возвращаем помещению чистоту.',
      features: ['Строительная пыль', 'Мусор', 'Пятна', 'Защита поверхностей'],
      price: 'от 7,000 ₽',
      href: '/services/post-renovation-cleaning'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы честно говорим: делаем уборку <strong>быстро, качественно и профессионально</strong>. 
            Никаких лишних обещаний — только реальная работа.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                <service.icon className="w-8 h-8 text-primary-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary-600">
                  {service.price}
                </span>
                <span className="text-sm text-gray-500">
                  за услугу
                </span>
              </div>

              {/* CTA */}
              <Link
                href={service.href}
                className="btn-outline w-full text-center"
              >
                Подробнее
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing note */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Минимальный заказ — 6 000 ₽
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Не нашли нужную услугу?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Расскажите нам о ваших потребностях, и мы предложим индивидуальное решение. 
              Работаем с любыми объектами и объемами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OpenWizardButton className="btn-primary" ctaId="services_section_contact">
                Связаться с нами
              </OpenWizardButton>
              <Link href="/prices" className="btn-secondary">
                Посмотреть все цены
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 