'use client';

import { motion } from 'framer-motion';
import { Check, Star, Home, Building, Sparkles, CheckCircle } from 'lucide-react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

export default function PricingSection() {
  const { openModal } = useAmoCRM();

  const pricingPlans = [
    {
      icon: Home,
      title: 'Поддерживающая уборка',
      description: 'Регулярная уборка для поддержания чистоты',
      price: 'от 6,000 ₽',
      duration: '2-3 часа',
      features: [
        'Пылесосим полы и ковры',
        'Моем полы и плинтусы',
        'Протираем пыль',
        'Убираем санузел',
        'Моем раковину и ванну',
        'Выносим мусор'
      ],
      popular: false
    },
    {
      icon: Building,
      title: 'Генеральная уборка',
      description: 'Тщательная уборка всех поверхностей',
      price: 'от 6,000 ₽',
      duration: '3-4 часа',
      features: [
        'Все из поддерживающей',
        'Моем окна и подоконники',
        'Чистим мебель',
        'Моем кухонные шкафы',
        'Чистим бытовую технику',
        'Моем балкон'
      ],
      popular: true
    },
    {
      icon: Sparkles,
      title: 'После ремонта',
      description: 'Уборка строительной пыли и мусора',
      price: 'от 7,000 ₽',
      duration: '4-6 часов',
      features: [
        'Все из генеральной',
        'Убираем строительную пыль',
        'Моем стены и потолки',
        'Чистим окна и двери',
        'Убираем мусор',
        'Финальная полировка'
      ],
      popular: false
    },
    {
      icon: CheckCircle,
      title: 'Эко уборка',
      description: 'Уборка с экологичными средствами',
      price: 'от 6,000 ₽',
      duration: '3-4 часа',
      features: [
        'Все из генеральной',
        'Экологичные средства',
        'Безопасно для детей',
        'Гипоаллергенные составы',
        'Приятный аромат',
        'Безопасная утилизация'
      ],
      popular: false
    },
    {
      icon: Star,
      title: 'VIP уборка',
      description: 'Премиум уборка с особым вниманием',
      price: 'от 10,000 ₽',
      duration: '4-6 часов',
      features: [
        'Все из генеральной',
        'Особое внимание к деталям',
        'Премиум средства',
        'Дополнительная полировка',
        'Ароматизация помещения',
        'Фотоотчет о работе'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    { service: 'Мытье окон', price: 'от 600 ₽ за створку' },
    { service: 'Химчистка дивана', price: 'от 3,000 ₽' },
    { service: 'Химчистка ковра', price: 'от 1,800 ₽' },
    { service: 'Уборка балкона', price: 'от 1,200 ₽' },
    { service: 'Мытье холодильника', price: 'от 1,000 ₽' },
    { service: 'Уборка шкафов', price: 'от 1,500 ₽' },
    { service: 'Химчистка матраса', price: 'от 2,500 ₽' },
    { service: 'Химчистка штор', price: 'от 2,000 ₽' },
    { service: 'Химчистка мягкой мебели', price: 'от 3,500 ₽' },
    { service: 'Уборка кухни', price: 'от 2,000 ₽' },
    { service: 'Уборка санузлов', price: 'от 1,500 ₽' },
    { service: 'Уборка шерсти животных', price: 'от 1,000 ₽' },
    { service: 'Дезинфекция', price: 'от 2,500 ₽' },
    { service: 'Ночная уборка', price: 'от 3,000 ₽' },
    { service: 'Срочная уборка', price: 'от 2,000 ₽' }
  ];

  const commercialServices = [
    { service: 'Уборка офисов', price: 'от 5,000 ₽' },
    { service: 'Уборка торговых центров', price: 'от 3,500 ₽' },
    { service: 'Уборка ресторанов', price: 'от 3,500 ₽' },
    { service: 'Уборка салонов красоты', price: 'от 3,500 ₽' },
    { service: 'Уборка медицинских учреждений', price: 'от 3,500 ₽' },
    { service: 'Уборка школ', price: 'от 3,500 ₽' },
    { service: 'Уборка фитнес клубов', price: 'от 3,500 ₽' },
    { service: 'Уборка бани и сауны', price: 'от 3,500 ₽' },
    { service: 'Уборка автосалонов', price: 'от 3,500 ₽' },
    { service: 'Уборка паркингов', price: 'от 2,500 ₽' },
    { service: 'Мойка витрин', price: 'от 1,500 ₽' },
    { service: 'Мойка фасадов', price: 'от 2,000 ₽' },
    { service: 'Промышленный альпинизм', price: 'от 5,000 ₽' },
    { service: 'Механизированная уборка', price: 'от 4,000 ₽' },
    { service: 'Уборка территории', price: 'от 3,000 ₽' },
    { service: 'Покос травы', price: 'от 2,500 ₽' },
    { service: 'Уборка снега', price: 'от 3,000 ₽' },
    { service: 'Химчистка автомобилей', price: 'от 2,500 ₽' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
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
            Прозрачные цены
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы честно показываем реальные цены. Никаких скрытых доплат — 
            только <strong>прозрачность и качество</strong>.
          </p>
          {/* Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 px-3 py-1 border border-primary-100">
              Минимальный заказ: 6000₽
            </span>
            <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1 border border-green-100">
              -10% новым клиентам
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-3 py-1 border border-amber-100">
              Пакет «Генеральная + окна» -15%
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Популярно</span>
                  </div>
                </div>
              )}

              <div className={`card p-6 h-full ${plan.popular ? 'border-2 border-primary-200 shadow-xl' : ''}`}>
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <plan.icon className="w-8 h-8 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary-600">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    Время работы: {plan.duration}
                  </div>
                  {/* m² guidance */}
                  {plan.title === 'Поддерживающая уборка' && (
                    <div className="text-xs text-gray-500 mt-1">Ориентир: 60–110 ₽/м²</div>
                  )}
                  {plan.title === 'Генеральная уборка' && (
                    <div className="text-xs text-gray-500 mt-1">Ориентир: 160–220 ₽/м²</div>
                  )}
                  {plan.title === 'После ремонта' && (
                    <div className="text-xs text-gray-500 mt-1">Ориентир: 220–300 ₽/м²</div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={openModal}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600'
                  }`}
                >
                  Заказать
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Дополнительные услуги
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">{service.service}</span>
                <span className="text-primary-600 font-semibold">{service.price}</span>
              </motion.div>
            ))}
          </div>

          {/* Window cleaning details */}
          <div className="mt-6 border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Мытьё окон — детали тарифа</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span>Створка (внутри/снаружи)</span>
                <span className="text-gray-700">от 600 ₽</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span>Балконный блок</span>
                <span className="text-gray-700">от 1000 ₽</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span>Москитная сетка/решётка</span>
                <span className="text-gray-700">+200–300 ₽</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Точные цены зависят от этажности и доступа. Итоговая смета согласуется перед началом работ.</p>
          </div>
        </motion.div>

        {/* Office pricing guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Офисы — ориентиры по м²</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="flex items-center justify-between p-3 bg-white/60 rounded-md">
              <span>Регулярная уборка</span>
              <span>80–110 ₽/м²</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/60 rounded-md">
              <span>Генеральная уборка</span>
              <span>100–140 ₽/м²</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Стоимость зависит от площади, графика и требований. Предложим коммерческое за 10–15 минут.</p>
        </motion.div>

        {/* Commercial Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Коммерческие услуги
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">{service.service}</span>
                <span className="text-primary-600 font-semibold">{service.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Discounts and Surcharges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Скидки и надбавки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Скидки</h4>
              <ul className="space-y-1 text-gray-700">
                <li>— Новым клиентам −10%</li>
                <li>— Пакет «Генеральная + окна» −15%</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">Скидки не суммируются — применяется лучшая.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Надбавки</h4>
              <ul className="space-y-1 text-gray-700">
                <li>— Срочно (24 ч): +20%</li>
                <li>— Ночная уборка (23:00–07:00): +15%</li>
                <li>— За МКАД (до 20 км): +15%</li>
              </ul>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-4 text-center">
            Как считаем: Итого = (площадь × ставка) + (окна × цена за створку) × надбавки − скидка. Округляем до 10 ₽. Итоговая сумма не ниже 6 000 ₽.
          </div>
        </motion.div>

        {/* Honest Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Важно знать
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Минимальный заказ: 6,000 ₽</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Цены зависят от площади и состояния помещения</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Оплата только после выполнения работ</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Работаем по договору</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Бесплатная консультация и расчет</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Гарантия качества</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Скидки при регулярном заказе</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Работаем 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 