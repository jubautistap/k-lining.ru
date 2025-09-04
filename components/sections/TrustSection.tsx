'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, FileText, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

export default function TrustSection() {
  const trustElements = [
    {
      icon: Shield,
      title: 'Страхование ответственности',
      description: 'Все работы застрахованы до 500 000 ₽. Возместим ущерб в случае повреждения имущества.',
      badge: 'Страховая защита'
    },
    {
      icon: FileText,
      title: 'Официальный договор',
      description: 'Заключаем договор с фиксированными ценами. Никаких скрытых доплат после начала работ.',
      badge: 'Юридические гарантии'
    },
    {
      icon: Users,
      title: 'Проверенная команда',
      description: 'Все сотрудники прошли проверку службы безопасности. Работаем только с опытными клинерами.',
      badge: 'Надёжность персонала'
    },
    {
      icon: Award,
      title: 'Сертифицированные средства',
      description: 'Используем только профессиональную химию с сертификатами качества и безопасности.',
      badge: 'Качество материалов'
    },
  ];

  const certifications = [
    {
      name: 'ИП регистрация',
      description: 'Официально зарегистрированная деятельность',
      document: 'ОГРНИП: 123456789012345'
    },
    {
      name: 'Страхование',
      description: 'Страхование гражданской ответственности',
      document: 'Полис № СГО-2024-001'
    },
    {
      name: 'Сертификация химии',
      description: 'Eco-friendly сертифицированные средства',
      document: 'Сертификат соответствия'
    }
  ];

  return (
    <section className="py-16 bg-white">
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
            Работаем официально и честно
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Все гарантии, документы и сертификаты для вашего спокойствия
          </p>
        </motion.div>

        {/* Trust Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustElements.map((element, index) => (
            <motion.div
              key={element.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 border border-primary-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <element.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full inline-block mb-2">
                    {element.badge}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {element.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {element.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Документы и сертификаты
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={cert.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded">
                  {cert.document}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-gray-900">Гарантия качества</h4>
              </div>
              <p className="text-gray-700 mb-3">
                Если результат работы вас не устроит — переделаем бесплатно или вернём деньги.
              </p>
              <div className="text-sm text-green-700 font-semibold">
                ✓ 30 дней гарантии на все виды работ
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Пунктуальность</h4>
              </div>
              <p className="text-gray-700 mb-3">
                Всегда приезжаем в назначенное время. Предупреждаем о задержках заранее.
              </p>
              <div className="text-sm text-blue-700 font-semibold">
                ✓ Скидка 10% при опоздании более чем на 30 минут
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-primary-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Все ещё сомневаетесь?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Позвоните нам, и мы ответим на все ваши вопросы. Расскажем о процессе работы, 
              покажем документы, дадим контакты довольных клиентов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+79255551833"
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
              >
                📞 Позвонить: +7 (925) 555-18-33
              </a>
              <button className="border border-primary-300 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                💬 Написать в WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}