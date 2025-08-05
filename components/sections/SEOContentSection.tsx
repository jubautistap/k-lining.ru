'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Phone, Clock, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SEOContentSection() {
  const advantages = [
    {
      icon: CheckCircle,
      title: 'Профессиональная команда',
      description: 'Только опытные клинеры с профильным образованием и сертификатами'
    },
    {
      icon: Clock,
      title: 'Работаем 24/7',
      description: 'Круглосуточно принимаем заявки и выполняем срочные заказы'
    },
    {
      icon: Shield,
      title: 'Страховка и гарантии',
      description: 'Полная страховка ответственности и гарантия качества на все услуги'
    },
    {
      icon: Star,
      title: 'Честные цены',
      description: 'Никаких скрытых доплат - цена фиксируется до начала работ'
    }
  ];

  const districts = [
    'Басманный', 'Таганский', 'Красносельский', 'Мещанский', 'Тверской',
    'Арбат', 'Хамовники', 'Замоскворечье', 'Якиманка', 'Пресненский'
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Основной SEO блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Клининговая компания K-lining в Москве — ваш надежный партнер в вопросах чистоты
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-6">
              <strong>Профессиональная уборка квартир в Москве</strong> от компании K-lining — это качественный сервис 
              по доступным ценам. Мы специализируемся на <Link href="/services/apartment-cleaning" className="text-primary-600 hover:text-primary-700 underline">уборке квартир</Link>, <Link href="/services/office-cleaning" className="text-primary-600 hover:text-primary-700 underline">уборке офисов</Link>, 
              <Link href="/services/furniture-dry-cleaning" className="text-primary-600 hover:text-primary-700 underline">химчистке мебели</Link> и <strong>генеральной уборке</strong> любой сложности.
            </p>
            
            <p className="mb-6">
              Наша <strong>клининговая компания в Москве</strong> работает <strong>24 часа в сутки, 7 дней в неделю</strong>. 
              Офис расположен по адресу: <strong>ул. Бакунинская, 69, стр. 1</strong> в <Link href="/districts/basmannyy" className="text-primary-600 hover:text-primary-700 underline">Басманном районе</Link>. 
              Мы выезжаем во все <Link href="/districts" className="text-primary-600 hover:text-primary-700 underline">районы Москвы</Link> и Московской области, обеспечивая <strong>профессиональную уборку</strong> 
              в удобное для вас время.
            </p>

            <h3 className="text-2xl font-bold mb-4">Наши услуги клининга в Москве</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Уборка квартир в Москве</strong> — от 2,500₽</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Уборка офисов</strong> — поддерживающая и генеральная</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Химчистка мебели</strong> и ковров на дому</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Мытье окон</strong> в квартирах и офисах</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Уборка после ремонта</strong> любой сложности</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span><strong>Генеральная уборка</strong> помещений</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Почему выбирают K-lining для уборки в Москве?</h3>
            <p className="mb-6">
              Выбирая нашу <strong>клининговую компанию</strong>, вы получаете не просто уборку, а комплексное решение 
              всех вопросов чистоты. Мы используем только <strong>профессиональные средства для уборки</strong> 
              и современное оборудование, что гарантирует высокое качество работ.
            </p>

            <p className="mb-6">
              <strong>Уборка квартир недорого в Москве</strong> — это не значит плохо. Мы предлагаем честные цены 
              без скрытых доплат. Стоимость <strong>клининга в Москве</strong> рассчитывается индивидуально 
              в зависимости от площади помещения, типа уборки и дополнительных услуг.
            </p>

            <h3 className="text-2xl font-bold mb-4">Районы обслуживания</h3>
            <p className="mb-4">
              Наша команда выезжает для проведения <strong>профессиональной уборки</strong> в следующие районы Москвы:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {districts.map((district, index) => (
                <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {district}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-4">Гарантии качества</h3>
            <p className="mb-6">
              Мы гарантируем качество выполненных работ. Если результат <strong>уборки квартиры</strong> или офиса 
              вас не устроит, мы бесплатно переделаем работу. Все наши сотрудники застрахованы, 
              поэтому вы можете быть уверены в сохранности вашего имущества.
            </p>

            <p className="mb-8">
              <strong>Химчистка дивана на дому</strong>, <strong>мытье окон в квартире</strong>, 
              <strong>генеральная уборка</strong> — каждая услуга выполняется с использованием 
              профессионального оборудования и безопасных моющих средств.
            </p>
          </div>
        </motion.div>

        {/* Преимущества */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Преимущества работы с K-lining
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <advantage.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Контакты и CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Закажите профессиональную уборку прямо сейчас!
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Работаем <strong>24/7</strong> — звоните в любое время или оставляйте заявку на сайте
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary-600" />
              <span className="text-lg font-semibold">+7 (925) 555-18-33</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span>ул. Бакунинская, 69, стр. 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-600" />
              <span>Круглосуточно</span>
            </div>
          </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="btn-primary text-lg px-8 py-4">
                Рассчитать стоимость уборки
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                Все клининговые услуги
              </Link>
            </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Сколько стоит уборка квартиры в Москве?",
                answer: "Стоимость уборки квартиры зависит от площади, типа уборки и дополнительных услуг. Базовая уборка 1-комнатной квартиры от 2,500₽, генеральная уборка от 3,500₽. Точную стоимость можно рассчитать в калькуляторе на сайте."
              },
              {
                question: "Работаете ли вы в выходные и праздники?",
                answer: "Да, наша клининговая компания работает 24/7 без выходных и праздников. Мы принимаем заявки круглосуточно и можем выполнить срочную уборку в любое время."
              },
              {
                question: "Какие районы Москвы вы обслуживаете?",
                answer: "Мы выезжаем во все районы Москвы и ближайшего Подмосковья. Офис находится в Басманном районе по адресу ул. Бакунинская, 69, стр. 1, но работаем по всему городу."
              },
              {
                question: "Предоставляете ли вы гарантию на услуги?",
                answer: "Да, мы даем гарантию качества на все виды клининговых услуг. Если результат работы вас не устроит, мы бесплатно исправим недочеты или вернем деньги."
              },
              {
                question: "Нужно ли покупать моющие средства?",
                answer: "Нет, все профессиональные моющие средства и оборудование входят в стоимость услуг. Мы используем только сертифицированные и безопасные средства для уборки."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}