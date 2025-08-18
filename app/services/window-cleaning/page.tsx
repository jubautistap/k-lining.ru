import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import FAQSchema from '@/components/ui/FAQSchema';
import { CheckCircle, Shield, Clock, Users, Star, Zap, Square } from 'lucide-react';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Мытьё окон в Москве — от 600 ₽ за створку, безопасно и без разводов | K-lining',
  description: 'Профессиональное мытьё окон в квартирах, домах и офисах. Полировка стекла, рам и подоконников. Работаем 24/7, выезд в день обращения. Тариф — от 600 ₽ за створку.',
  openGraph: {
    title: 'Мытьё окон — профессионально, быстро, без разводов',
    description: 'Мытьё окон и витражей в Москве. Балконы, лоджии, высотные работы. Честные цены — от 600 ₽ за створку.',
    url: 'https://k-lining.ru/services/window-cleaning',
    siteName: 'K-lining',
    images: [
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'Мытьё окон в Москве' }
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/window-cleaning',
  },
};

export default function WindowCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema
          items={[
            { name: 'Услуги', url: '/services' },
            { name: 'Мытьё окон', url: '/services/window-cleaning' },
          ]}
        />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Мытье окон в Москве
            </h1>
            <p className="text-xl mb-8">
              Профессиональное мытье окон в квартирах, домах и офисах. Выезд в день заказа
            </p>
            <div className="hidden md:block"></div>
            <MiniCalculator defaultArea={50} propertyType="apartment" cleaningType="general" windowsCount={4} className="md:justify-self-end" />
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* What's Included */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  Что входит в мытье окон
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье стекол</h3>
                      <p className="text-gray-600">Очистка от пыли, грязи, разводов</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Очистка рам и подоконников</h3>
                      <p className="text-gray-600">Удаление пыли и загрязнений</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье москитных сеток</h3>
                      <p className="text-gray-600">Очистка от пыли и паутины</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Очистка откосов</h3>
                      <p className="text-gray-600">Удаление пыли и загрязнений</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье балконных дверей</h3>
                      <p className="text-gray-600">Очистка стекол и рам</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Полировка стекол</h3>
                      <p className="text-gray-600">Удаление разводов и блеск</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Стоимость (единая метрика — за створку)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Створка (внутри/снаружи)</span>
                <span className="font-bold text-xl">от 600 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Балконный блок</span>
                <span className="font-bold text-xl">от 1 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Москитная сетка/решётка</span>
                <span className="font-bold text-xl">+200–300 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                <span className="text-gray-600">Вышка/этажность (с 3-го этажа)</span>
                <span className="font-bold text-xl">+30%</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                  <p className="text-sm text-cyan-800">
                💡 Цена зависит от количества створок, высоты и сложности доступа
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              Профессиональное оборудование
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Zap className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Специальные средства</h3>
                <p className="text-gray-600">Профессиональные моющие средства для стекол</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Страховка и безопасность</h3>
                <p className="text-gray-600">Работаем на высоте с полной страховкой</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Опытные мастера</h3>
                <p className="text-gray-600">Специалисты с опытом работы на высоте</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы заказать мытье окон?
          </h2>
          <p className="text-xl mb-8">
            Оставьте заявку и получите бесплатную консультацию
          </p>
          <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
            Заказать мытье окон
          </Link>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <FAQSchema
        items={[
          { question: 'Сколько стоит мытьё окон?', answer: 'Базовый тариф — от 600 ₽ за створку. Балконный блок — от 1 000 ₽. Доплаты за высоту с 3-го этажа и сложный доступ.' },
          { question: 'Когда можете приехать?', answer: 'Работаем 24/7. Выезд возможен в день обращения, при срочном заказе — в течение 2 часов.' },
          { question: 'Вы работаете на высоте?', answer: 'Да, выполняем высотные работы с соблюдением техники безопасности и страховкой.' },
        ]}
      />

      {/* Перелинковка на смежные услуги */}
      <RelatedServicesSection currentService="/services/window-cleaning" />
    </div>
  );
} 