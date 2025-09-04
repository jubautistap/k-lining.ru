'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Clock, Users } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  specialization: string[];
  rating: number;
  completedOrders: number;
  description: string;
  avatar: string;
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Анна Петрова',
      role: 'Старший клинер',
      experience: '5+ лет',
      specialization: ['Генеральная уборка', 'После ремонта', 'Мытьё окон'],
      rating: 4.9,
      completedOrders: 850,
      description: 'Руководитель бригады, отвечает за качество и обучение новичков. Любит сложные задачи.',
      avatar: '/images/team/anna-petrova.jpg'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      role: 'Специалист по химчистке',
      experience: '3+ года',
      specialization: ['Химчистка мебели', 'Чистка ковров', 'Удаление пятен'],
      rating: 4.8,
      completedOrders: 420,
      description: 'Эксперт по работе с различными типами тканей и сложными загрязнениями.',
      avatar: '/images/team/maria-ivanova.jpg'
    },
    {
      id: 3,
      name: 'Елена Сидорова',
      role: 'Клинер-универсал',
      experience: '4+ года',
      specialization: ['Поддерживающая уборка', 'Офисы', 'Дезинфекция'],
      rating: 4.9,
      completedOrders: 650,
      description: 'Быстро и аккуратно справляется с любыми задачами. Клиенты часто просят именно её.',
      avatar: '/images/team/elena-sidorova.jpg'
    }
  ];

  const workingProcess = [
    {
      step: 1,
      title: 'Приезжаем точно в срок',
      description: 'Звоним за 30 минут до приезда. У каждого клинера есть фото и удостоверение.',
      icon: Clock
    },
    {
      step: 2,
      title: 'Осматриваем объект',
      description: 'Уточняем детали, показываем инвентарь и средства. Фиксируем окончательную цену.',
      icon: Users
    },
    {
      step: 3,
      title: 'Работаем качественно',
      description: 'Следуем чек-листу, используем профессиональное оборудование. Убираем за собой.',
      icon: Award
    },
    {
      step: 4,
      title: 'Принимаете работу',
      description: 'Осматриваете результат, оплачиваете только при полном удовлетворении качеством.',
      icon: Star
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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
            Знакомьтесь с нашей командой
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Опытные специалисты, которые любят своё дело и отвечают за каждый заказ
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-800">
                    {member.name.split(' ').map(n => n.charAt(0)).join('')}
                  </span>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-2">{member.role}</p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{member.experience}</div>
                  <div className="text-xs text-gray-500">опыта</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    {renderStars(Math.floor(member.rating))}
                  </div>
                  <div className="text-xs text-gray-500">{member.rating}/5</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{member.completedOrders}+</div>
                  <div className="text-xs text-gray-500">заказов</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {member.description}
              </p>

              {/* Specialization */}
              <div className="flex flex-wrap justify-center gap-2">
                {member.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Working Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Как мы работаем
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingProcess.map((process, index) => (
              <div key={process.step} className="text-center">
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {process.step}
                </div>
                
                {/* Icon */}
                <div className="w-8 h-8 mx-auto mb-3">
                  <process.icon className="w-8 h-8 text-primary-600 mx-auto" />
                </div>
                
                {/* Content */}
                <h4 className="font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{process.description}</p>
                
                {/* Connector */}
                {index < workingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Мы знаем своих клинеров лично
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              В нашей команде работают только проверенные специалисты с опытом от 3 лет. 
              Каждый клинер прошёл собеседование, проверку документов и стажировку. 
              Мы гордимся каждым членом команды и отвечаем за качество их работы.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}