'use client';

import { motion } from 'framer-motion';
import { Clock, Home, MapPin, Star, CheckCircle } from 'lucide-react';

export default function CaseStudiesSection() {
  const cases = [
    {
      title: 'Генеральная уборка 3-к квартиры',
      area: '85 м²',
      time: '4.5 часа',
      district: 'Басманный район',
      price: '12 500 ₽',
      team: '3 клинера',
      challenges: ['Застарелые пятна на ковре', 'Жировые отложения на кухне', 'Известковый налёт в ванной'],
      results: ['Ковёр как новый', 'Кухня сияет чистотой', 'Сантехника блестит'],
      clientName: 'Мария К.',
      clientReview: 'Впечатляющий результат! Квартира преобразилась. Ребята работали аккуратно, ничего не повредили. Теперь обращаюсь только к ним.',
      rating: 5,
      beforeAfter: {
        before: '/images/case-kitchen-before.jpg',
        after: '/images/case-kitchen-after.jpg'
      }
    },
    {
      title: 'Уборка после ремонта студии',
      area: '35 м²',
      time: '5 часов',
      district: 'Тверской район',
      price: '9 800 ₽',
      team: '2 клинера',
      challenges: ['Строительная пыль везде', 'Следы краски и клея', 'Мусор и обрезки материалов'],
      results: ['Идеальная чистота', 'Готово к заселению', 'Воздух стал свежим'],
      clientName: 'Алексей М.',
      clientReview: 'После ремонта студия была в ужасном состоянии. K-lining сделали невозможное — теперь можно сразу заселяться!',
      rating: 5,
      beforeAfter: {
        before: '/images/case-renovation-before.jpg',
        after: '/images/case-renovation-after.jpg'
      }
    },
    {
      title: 'Химчистка мебели в гостиной',
      area: 'Диван 3м + 2 кресла',
      time: '2 часа',
      district: 'ЮЗАО',
      price: '8 500 ₽',
      team: '2 специалиста',
      challenges: ['Пятна от домашних животных', 'Следы детского творчества', 'Неприятные запахи'],
      results: ['Мебель как из магазина', 'Никаких запахов', 'Мягкая и приятная на ощупь'],
      clientName: 'Елена В.',
      clientReview: 'Думала, что диван придётся выбрасывать. Результат превзошёл все ожидания — мебель выглядит новой!',
      rating: 5,
      beforeAfter: {
        before: '/images/case-sofa-before.jpg',
        after: '/images/case-sofa-after.jpg'
      }
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
    <section className="py-16 bg-gray-50">
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
            Реальные кейсы наших работ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Честные цифры, детали процесса и результаты. Никаких приукрашиваний.
          </p>
        </motion.div>

        {/* Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {caseItem.title}
                </h3>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <Home className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900">{caseItem.area}</div>
                    <div className="text-xs text-gray-600">площадь</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900">{caseItem.time}</div>
                    <div className="text-xs text-gray-600">время</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900">{caseItem.district}</div>
                    <div className="text-xs text-gray-600">район</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{caseItem.price}</div>
                    <div className="text-xs text-gray-600">стоимость</div>
                  </div>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="px-6 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">До работ</div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                        <span className="text-red-600 font-medium">Фото до уборки</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">После работ</div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <span className="text-green-600 font-medium">Фото после уборки</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Challenges */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Сложности
                    </h4>
                    <ul className="space-y-2">
                      {caseItem.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Результат
                    </h4>
                    <ul className="space-y-2">
                      {caseItem.results.map((result, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Client Review */}
                <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                      <span className="text-primary-800 font-semibold">
                        {caseItem.clientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{caseItem.clientName}</div>
                      <div className="flex items-center gap-1">
                        {renderStars(caseItem.rating)}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic">
                    "{caseItem.clientReview}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Каждый кейс — это реальная работа
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы не скрываем сложности и честно показываем процесс. 
              Можем предоставить контакты клиентов для подтверждения отзывов.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


