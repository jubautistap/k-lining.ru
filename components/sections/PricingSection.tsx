'use client';

import { Check, Star, Home, Building, Sparkles, CheckCircle } from 'lucide-react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';
import ServiceCard from '../ui/ServiceCard';

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
    { service: 'Дезинфекция', price: 'от 3,000 ₽' }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Прозрачные цены на уборку
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Фиксированные тарифы без скрытых доплат. Выбирайте подходящий пакет услуг 
            и получайте точную стоимость заранее.
          </p>
        </div>

        {/* Тарифные планы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <ServiceCard
              key={plan.title}
              icon={plan.icon}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              duration={plan.duration}
              features={plan.features}
              popular={plan.popular}
              onClick={openModal}
              className={`fade-in`}
            />
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Дополнительные услуги
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={service.service}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-gray-900">{service.service}</span>
                <span className="text-primary-600 font-semibold">{service.price}</span>
              </div>
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
        </div>

        {/* Office pricing guidance */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Офисы — ориентиры по м²</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-primary-100">
              <span className="flex items-center gap-2 text-gray-900">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                Поддерживающая
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold">80–110 ₽/м²</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-primary-100">
              <span className="flex items-center gap-2 text-gray-900">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                Генеральная
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold">100–140 ₽/м²</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-primary-100">
              <span className="flex items-center gap-2 text-gray-900">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                После ремонта
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold">160–200 ₽/м²</span>
            </div>
          </div>
        </div>

        {/* Надбавки */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Надбавки к базовой стоимости</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs border border-amber-200">Надбавки</span>
              </h5>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
                  <span className="flex items-center gap-2 text-gray-900">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Срочно (24 часа)
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold">+20%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
                  <span className="flex items-center gap-2 text-gray-900">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Ночная уборка (23:00–07:00)
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold">+15%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-amber-100">
                  <span className="flex items-center gap-2 text-gray-900">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    За МКАД (до 20 км)
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold">+15%</span>
                </div>
              </div>
            </div>

            {/* Скидки */}
            <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs border border-green-200">Скидки</span>
              </h5>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-green-100">
                  <span className="flex items-center gap-2 text-gray-900">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Новый клиент
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-xs font-semibold">−10%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-md border border-green-100">
                  <span className="flex items-center gap-2 text-gray-900">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Пакет «Генеральная + окна»
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-xs font-semibold">−15%</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-3">Скидки не суммируются — применяется лучшая.</p>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-6 text-center">
            Как считаем: Итого = (площадь × ставка) + (окна × цена за створку) × надбавки − скидка. Округляем до 10 ₽. Итоговая сумма не ниже 6 000 ₽.
          </div>
        </div>

        {/* Honest Message */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Важно знать
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
        </div>
      </div>
    </section>
  );
} 