'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Users, Star, Zap, Sofa } from 'lucide-react';

export default function FurnitureDryCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Химчистка мебели в Москве
            </h1>
            <p className="text-xl mb-8">
              Профессиональная химчистка диванов, кресел, матрасов и мягкой мебели. Выезд на дом
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
                Заказать химчистку
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
                  Что входит в химчистку мебели
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Диваны и кресла</h3>
                      <p className="text-gray-600">Химчистка всех типов мягкой мебели</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Матрасы и подушки</h3>
                      <p className="text-gray-600">Удаление пыли, клещей, пятен</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Ковры и ковролин</h3>
                      <p className="text-gray-600">Глубокая очистка с обеих сторон</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Автомобильные салоны</h3>
                      <p className="text-gray-600">Химчистка сидений, потолка, багажника</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Удаление пятен</h3>
                      <p className="text-gray-600">Кофе, вино, жир, краска, кровь</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Дезинфекция</h3>
                      <p className="text-gray-600">Уничтожение бактерий и аллергенов</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Стоимость</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Диван 2-местный</span>
                    <span className="font-bold text-xl">от 2,500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Диван 3-местный</span>
                    <span className="font-bold text-xl">от 3,500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Диван угловой</span>
                    <span className="font-bold text-xl">от 4,500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Кресло</span>
                    <span className="font-bold text-xl">от 1,500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Матрас</span>
                    <span className="font-bold text-xl">от 2,000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ковер (м²)</span>
                    <span className="font-bold text-xl">от 300 ₽</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    💡 Цена зависит от размера, материала и степени загрязнения
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
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Моющие машины</h3>
                <p className="text-gray-600">Профессиональные экстракторы для глубокой очистки</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Экологичные средства</h3>
                <p className="text-gray-600">Безопасные для людей и животных химикаты</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Опытные мастера</h3>
                <p className="text-gray-600">Специалисты с опытом работы от 5 лет</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы заказать химчистку мебели?
          </h2>
          <p className="text-xl mb-8">
            Оставьте заявку и получите бесплатную консультацию
          </p>
          <Link href="/contacts" className="btn-primary text-lg px-8 py-4">
            Заказать химчистку
          </Link>
        </div>
      </section>
    </div>
  );
} 