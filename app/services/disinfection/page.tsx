import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import { CheckCircle, Shield, Clock, Users, Star, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Дезинфекция помещений в Москве — квартиры, офисы | K-lining',
  description: 'Дезинфекция помещений в Москве от 3500₽: квартиры, офисы, медучреждения. Сертифицированные средства, официальный сертификат ⭐',
  openGraph: {
    title: 'Дезинфекция — квартиры, офисы, медучреждения',
    description: 'Профессиональная санобработка помещений. Генераторы тумана, сертифицированные дезсредства.',
    url: 'https://k-lining.ru/services/disinfection',
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
    siteName: 'K-lining',
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: { canonical: 'https://k-lining.ru/services/disinfection' },
};

export default function DisinfectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[{ name: 'Услуги', url: '/services' }, { name: 'Дезинфекция', url: '/services/disinfection' }]} />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Дезинфекция помещений в Москве
            </h1>
            <p className="text-xl mb-8">
              Профессиональная дезинфекция квартир, офисов, медицинских учреждений. Уничтожение вирусов и бактерий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
                Заказать дезинфекцию
              </Link>
              <Link href="/prices" className="btn-secondary text-lg px-8 py-4">
                Узнать цены
              </Link>
            </div>
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
                  Что входит в дезинфекцию
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Обработка поверхностей</h3>
                      <p className="text-gray-600">Столы, стулья, дверные ручки, выключатели</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Дезинфекция воздуха</h3>
                      <p className="text-gray-600">Обработка помещений специальными растворами</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Обработка санузлов</h3>
                      <p className="text-gray-600">Туалеты, душевые, раковины, ванны</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Дезинфекция кухни</h3>
                      <p className="text-gray-600">Столешницы, плита, холодильник, мойка</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Обработка текстиля</h3>
                      <p className="text-gray-600">Диваны, кресла, ковры, шторы</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Сертификат дезинфекции</h3>
                      <p className="text-gray-600">Документ о проведенной обработке</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Стоимость</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Студия (до 30 м²)</span>
                    <span className="font-bold text-xl">от 3,500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">1-комнатная (до 50 м²)</span>
                    <span className="font-bold text-xl">от 5,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">2-комнатная (до 70 м²)</span>
                    <span className="font-bold text-xl">от 7,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">3-комнатная (до 100 м²)</span>
                    <span className="font-bold text-xl">от 9,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Офис (м²)</span>
                    <span className="font-bold text-xl">от 80 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Медицинские учреждения</span>
                    <span className="font-bold text-xl">от 120 ₽</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 Цена зависит от площади, типа помещения и сложности обработки
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
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Генераторы тумана</h3>
                <p className="text-gray-600">Равномерное распыление дезинфицирующих средств</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Сертифицированные средства</h3>
                <p className="text-gray-600">Одобренные Роспотребнадзором дезинфектанты</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Специалисты-дезинфекторы</h3>
                <p className="text-gray-600">Обученный персонал с сертификатами</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы заказать дезинфекцию?
          </h2>
          <p className="text-xl mb-8">
            Оставьте заявку и получите бесплатную консультацию
          </p>
          <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
            Заказать дезинфекцию
          </Link>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <FAQSchema
        items={[
          { question: 'Сколько стоит дезинфекция?', answer: 'Студия — от 3 500 ₽, 1‑комнатная — от 5 000 ₽, 2‑комнатная — от 7 000 ₽, 3‑комнатная — от 9 000 ₽. Офисы — от 80 ₽/м².' },
          { question: 'Какие средства используете?', answer: 'Сертифицированные дезсредства, одобренные Роспотребнадзором. Безопасность подтверждается документально.' },
          { question: 'Вы выдаёте сертификат?', answer: 'Да, по итогам обработки выдаём сертификат о проведенной дезинфекции.' },
        ]}
      />

      {/* Перелинковка */}
      <RelatedServicesSection currentService="/services/disinfection" />
    </div>
  );
} 