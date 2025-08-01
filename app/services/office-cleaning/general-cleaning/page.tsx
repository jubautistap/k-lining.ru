'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Users, Star, Zap, Building } from 'lucide-react';

export default function GeneralOfficeCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Генеральная уборка офисов в Москве
            </h1>
            <p className="text-xl mb-8">
              Комплексная уборка офисных помещений с профессиональным оборудованием и качественными средствами
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
                  Что входит в генеральную уборку офиса
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Уборка всех поверхностей</h3>
                      <p className="text-gray-600">Столы, стулья, шкафы, полки, подоконники</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье полов и ковров</h3>
                      <p className="text-gray-600">Влажная уборка, пылесос, химчистка ковровых покрытий</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Уборка санузлов</h3>
                      <p className="text-gray-600">Туалеты, душевые, раковины, зеркала</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье окон и светильников</h3>
                      <p className="text-gray-600">Очистка стекол, плафонов, люстр</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Дезинфекция</h3>
                      <p className="text-gray-600">Обработка дверных ручек, выключателей, телефонов</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Стоимость</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">До 100 м²</span>
                    <span className="font-bold text-xl">от 15,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">100-300 м²</span>
                    <span className="font-bold text-xl">от 25,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">300-500 м²</span>
                    <span className="font-bold text-xl">от 35,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">От 500 м²</span>
                    <span className="font-bold text-xl">от 45,000 ₽</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Цена зависит от площади, количества санузлов и сложности работ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
                <p className="text-gray-600">100% гарантия на все виды работ</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Работаем 24/7</h3>
                <p className="text-gray-600">В любое удобное для вас время</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Опытные специалисты</h3>
                <p className="text-gray-600">Обученный персонал с опытом от 3 лет</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы заказать генеральную уборку офиса?
          </h2>
          <p className="text-xl mb-8">
            Оставьте заявку и получите бесплатную консультацию
          </p>
          <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
            Заказать уборку
          </Link>
        </div>
      </section>
    </div>
  );
} 