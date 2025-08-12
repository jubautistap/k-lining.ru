'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Zap, Users, CheckCircle, Heart, Award } from 'lucide-react';

export default function WhyChooseUsSection() {
  const advantages = [
    {
      icon: Clock,
      title: 'Работаем 24/7',
      description: 'Заказывайте уборку в любое время дня и ночи. Мы всегда на связи.',
    },
    {
      icon: Shield,
      title: 'Честные цены',
      description: 'Никаких скрытых доплат. Цена фиксированная и прозрачная.',
    },
    {
      icon: Zap,
      title: 'Быстро и качественно',
      description: 'Средняя уборка занимает 2-4 часа. Результат виден сразу.',
    },
    {
      icon: Users,
      title: 'Профессиональная команда',
      description: 'Опытные клинеры с собственным инвентарем и химией.',
    },
    {
      icon: CheckCircle,
      title: 'Гарантия качества',
      description: 'Если что-то не понравилось — переделаем бесплатно.',
    },
    {
      icon: Heart,
      title: 'Индивидуальный подход',
      description: 'Учитываем ваши пожелания и особенности помещения.',
    }
  ];

  const stats = [
    {
      number: '24/7',
      label: 'Поддержка клиентов',
      icon: Clock
    },
    {
      number: '0₽',
      label: 'Скрытых доплат',
      icon: Shield
    },
    {
      number: '2-4ч',
      label: 'Среднее время уборки',
      icon: Zap
    },
    {
      number: '100%',
      label: 'Гарантия качества',
      icon: CheckCircle
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
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
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Компания молодая, команда опытная — делаем <strong>качественно и прозрачно</strong>.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center bg-primary-100">
                <advantage.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Наши показатели
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы честно показываем реальные цифры, а не придуманную статистику
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Honest Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Честность — наш принцип
              </h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы не обещаем лишнего. Делаем работу качественно, фиксируем цену заранее и отвечаем за результат.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 