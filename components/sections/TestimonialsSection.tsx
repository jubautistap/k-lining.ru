'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  avatar?: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Мария К.',
      location: 'Басманный район',
      service: 'Генеральная уборка 2к квартиры',
      rating: 5,
      text: 'Ребята справились за 3 часа! Квартира засияла чистотой. Особенно хорошо отмыли ванную и кухню. Работают аккуратно, ничего не повредили.',
      beforeAfter: {
        before: '/images/cleaning-before-1.jpg',
        after: '/images/cleaning-after-1.jpg'
      }
    },
    {
      id: 2,
      name: 'Алексей М.',
      location: 'Тверской район',
      service: 'Уборка после ремонта',
      rating: 5,
      text: 'После ремонта студии была жуткая пыль. K-lining убрали всё идеально - даже строительную пыль с батарей и труднодоступных мест. Рекомендую!',
      beforeAfter: {
        before: '/images/renovation-before.jpg',
        after: '/images/renovation-after.jpg'
      }
    },
    {
      id: 3,
      name: 'Елена В.',
      location: 'ЮЗАО',
      service: 'Химчистка мебели',
      rating: 5,
      text: 'Диван был в пятнах от кота и детей. Думала придется выбрасывать. Химчистка вернула ему первозданный вид! Быстро, качественно, недорого.',
    },
    {
      id: 4,
      name: 'Дмитрий П.',
      location: 'ЦАО',
      service: 'Уборка офиса 200м²',
      rating: 5,
      text: 'Убирают наш офис уже полгода. Всегда приходят вовремя, работают тихо, чтобы не мешать сотрудникам. Качество стабильно высокое.',
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Реальные отзывы реальных людей. Мы гордимся каждым выполненным заказом.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">на основе 127+ отзывов</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-primary-200" />
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="text-sm text-primary-700 font-medium bg-primary-50 px-3 py-1 rounded-full inline-block mb-4">
                {testimonial.service}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "{testimonial.text}"
              </blockquote>

              {/* Before/After Images (если есть) */}
              {testimonial.beforeAfter && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">До</div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Фото до</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">После</div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-sm">Фото после</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">127+</div>
            <div className="text-sm text-gray-600">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">4.9</div>
            <div className="text-sm text-gray-600">Средняя оценка</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">0%</div>
            <div className="text-sm text-gray-600">Негативных отзывов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Рекомендуют друзьям</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}