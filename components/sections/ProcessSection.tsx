'use client';

import { motion } from 'framer-motion';
import { Phone, Calendar, Users, CheckCircle, CreditCard, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export default function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      title: '1. Звонок или заявка',
      description: 'Позвоните нам или оставьте заявку на сайте. Мы ответим в течение 10 минут.',
      details: ['Бесплатная консультация', 'Расчет стоимости', 'Выбор удобного времени']
    },
    {
      icon: Calendar,
      title: '2. Согласование',
      description: 'Обсуждаем детали, согласовываем время и объем работ.',
      details: ['Уточнение площади', 'Специфические требования', 'Доступ к помещению']
    },
    {
      icon: Users,
      title: '3. Приезд команды',
      description: 'Наши специалисты приезжают в назначенное время со всем необходимым.',
      details: ['Собственный инвентарь', 'Профессиональная химия', 'Спецодежда']
    },
    {
      icon: CheckCircle,
      title: '4. Выполнение работ',
      description: 'Делаем уборку качественно и в срок. В среднем 2-4 часа.',
      details: ['Поэтапная уборка', 'Контроль качества', 'Фотоотчет']
    },
    {
      icon: CreditCard,
      title: '5. Оплата',
      description: 'Оплачиваете только после приемки работ. Никаких предоплат.',
      details: ['Наличные или карта', 'Чек и договор', 'Гарантия качества']
    },
    {
      icon: ThumbsUp,
      title: '6. Результат',
      description: 'Получаете чистое помещение и возможность заказать повторную уборку.',
      details: ['Приемка работ', 'Рекомендации по уходу', 'Программа лояльности']
    }
  ];

  return (
    <section className="section-padding bg-white overflow-x-hidden">
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
            Как мы работаем
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Простой и прозрачный процесс работы. Никаких сложностей — 
            только <strong>качество и удобство</strong> для вас.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute md:-top-4 md:-left-4 top-3 left-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="card p-6 h-full relative overflow-hidden">
                {/* Mobile connector line (vertical) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 bottom-0 translate-x-[-50%] h-8 w-0.5 bg-primary-200" />
                )}
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы начать?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Оставьте заявку прямо сейчас и получите бесплатную консультацию. 
              Мы перезвоним в течение 10 минут.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
                Заказать уборку
              </Link>
              <Link href="/prices" className="btn-secondary text-lg px-8 py-4">
                Узнать цены
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 