'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Users, Star, Zap, Hammer } from 'lucide-react';

export default function PostRenovationCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Уборка после ремонта в Москве
            </h1>
            <p className="text-xl mb-8">
              Профессиональная уборка строительной пыли и мусора. Возвращаем помещению чистоту и уют
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
                  Что входит в уборку после ремонта
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Удаление строительной пыли</h3>
                      <p className="text-gray-600">Очистка всех поверхностей от пыли и загрязнений</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Уборка строительного мусора</h3>
                      <p className="text-gray-600">Вынос остатков материалов, обрезков, упаковки</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Очистка окон и подоконников</h3>
                      <p className="text-gray-600">Удаление следов клея, краски, герметика</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Мытье полов и стен</h3>
                      <p className="text-gray-600">Удаление следов краски, клея, цемента</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Очистка сантехники</h3>
                      <p className="text-gray-600">Удаление строительных загрязнений с труб, кранов</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Финишная уборка</h3>
                      <p className="text-gray-600">Полировка поверхностей, дезинфекция</p>
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
                    <span className="font-bold text-xl">от 8,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">1-комнатная (до 50 м²)</span>
                    <span className="font-bold text-xl">от 12,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">2-комнатная (до 70 м²)</span>
                    <span className="font-bold text-xl">от 16,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">3-комнатная (до 100 м²)</span>
                    <span className="font-bold text-xl">от 20,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Дом/коттедж</span>
                    <span className="font-bold text-xl">от 25,000 ₽</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    💡 Цена зависит от площади, сложности ремонта и количества мусора
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
                <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Мощные пылесосы</h3>
                <p className="text-gray-600">Удаляют строительную пыль из всех щелей</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Защитные средства</h3>
                <p className="text-gray-600">Специальные химикаты для удаления краски и клея</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Опытные мастера</h3>
                <p className="text-gray-600">Знают все тонкости уборки после ремонта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы заказать уборку после ремонта?
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