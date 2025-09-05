import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Shield, DollarSign } from 'lucide-react';
import OpenWizardButton from '@/components/ui/OpenWizardButton';
import StructuredData from '@/components/seo/StructuredData';
import ReviewSchema from '@/components/ui/ReviewSchema';

export const metadata: Metadata = {
  title: 'Уборка квартир Москва 24/7 — профессиональный клининг | K-lining',
  description: 'Уборка квартир в Москве 24/7: генеральная от 6000₽, поддерживающая от 3500₽, после ремонта от 8000₽. Гарантия качества, выезд за 2 часа ⭐',
  keywords: 'уборка квартиры москва, клининг квартиры москва, поддерживающая уборка, генеральная уборка, уборка после ремонта',
  alternates: { canonical: 'https://k-lining.ru/uborka-kvartiry-moskva' },
  openGraph: {
    title: 'Уборка квартиры в Москве — K-lining',
    description: 'Профессиональная уборка квартир 24/7: поддерживающая, генеральная, после ремонта.',
    url: 'https://k-lining.ru/uborka-kvartiry-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Уборка квартиры в Москве' }],
  },
};

export default function ApartmentCleaningMoscowPage() {
  return (
    <>
      {/* Reviews Schema for rich snippets */}
      <ReviewSchema />
      
      {/* Structured Data для лендинга */}
      <StructuredData 
        type="Article"
        data={{
          title: "Уборка квартиры в Москве",
          description: "Профессиональная уборка квартир в Москве и МО. Поддерживающая, генеральная, после ремонта. Работаем 24/7.",
          url: "https://k-lining.ru/uborka-kvartiry-moskva",
          about: "Клининг квартир в Москве"
        }}
      />
      
      <StructuredData 
        type="Service"
        data={{
          name: "Уборка квартир в Москве",
          description: "Профессиональная уборка квартир: поддерживающая, генеральная, после ремонта. Выезд 24/7 по Москве и МО.",
          serviceType: "Клининг квартир",
          startingPrice: "3500",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "RUB",
            lowPrice: "3500",
            highPrice: "15000",
            offerCount: 4,
            offers: [
              {
                "@type": "Offer",
                name: "Поддерживающая уборка 1к квартиры",
                price: "3500",
                priceCurrency: "RUB"
              },
              {
                "@type": "Offer", 
                name: "Генеральная уборка 2к квартиры",
                price: "8000",
                priceCurrency: "RUB"
              }
            ]
          }
        }}
      />

      <StructuredData 
        type="FAQPage"
        data={[
          {
            question: "Сколько стоит уборка квартиры в Москве?",
            answer: "Стоимость уборки квартиры в Москве от 3500₽ за однокомнатную. Точная цена зависит от площади, типа уборки и дополнительных услуг. Воспользуйтесь онлайн-калькулятором для быстрого расчета."
          },
          {
            question: "Какие виды уборки квартир вы предлагаете?",
            answer: "Мы предлагаем поддерживающую уборку (регулярная уборка), генеральную уборку (глубокая чистка всех поверхностей) и уборку после ремонта (удаление строительной пыли и мусора)."
          },
          {
            question: "Как быстро приедет клинер?",
            answer: "Мы работаем 24/7 и можем приехать в день обращения. Срочный выезд в течение 2-4 часов. Обычная запись — на удобное для вас время."
          },
          {
            question: "Какая гарантия на уборку квартиры?",
            answer: "Мы предоставляем гарантию качества на все виды работ. Если результат не устраивает — бесплатно переделаем в течение 24 часов."
          }
        ]}
      />

      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom space-y-12">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
              <li>/</li>
              <li className="text-gray-900">Уборка квартиры Москва</li>
            </ol>
          </nav>

          <header className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Уборка квартиры в Москве</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              <strong>Профессиональная уборка квартир в Москве и МО</strong> — поддерживающая, генеральная и уборка после ремонта. 
              Работаем <strong>24/7</strong>, выезжаем в день обращения. Собственные материалы, честные цены, гарантия качества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="btn-secondary px-8 py-4 text-lg">Рассчитать стоимость</Link>
              <OpenWizardButton className="btn-primary px-8 py-4 text-lg" ctaId="uborka_kvartiry_msk_cta">Заказать уборку</OpenWizardButton>
            </div>
          </header>

          {/* Цены на уборку квартир */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Цены на уборку квартир в Москве</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Тип квартиры</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Поддерживающая</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Генеральная</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">После ремонта</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">1-комнатная (до 45 м²)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 3500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 5500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 7500₽</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">2-комнатная (до 70 м²)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 4500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 7500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 10500₽</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">3-комнатная (до 90 м²)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 5500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 9000₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 12500₽</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">4+ комнаты (свыше 90 м²)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 6500₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 11000₽</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">от 15000₽</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              * Указаны базовые цены. Итоговая стоимость зависит от состояния квартиры и дополнительных услуг.
            </p>
          </section>

          {/* Виды уборки квартир */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Поддерживающая уборка</h3>
              <p className="text-gray-600 mb-4">
                Регулярная уборка квартиры для поддержания чистоты. Подходит для жилых помещений в нормальном состоянии.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Влажная уборка всех поверхностей</li>
                <li>• Мытье полов и плинтусов</li>
                <li>• Уборка кухни и санузла</li>
                <li>• Вынос мусора</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl"></span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Генеральная уборка</h3>
              <p className="text-gray-600 mb-4">
                Глубокая уборка квартиры с чисткой всех поверхностей, техники и труднодоступных мест.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Мытье техники внутри и снаружи</li>
                <li>• Чистка плитки, сантехники</li>
                <li>• Мытье окон и подоконников</li>
                <li>• Уборка шкафов изнутри</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Уборка после ремонта</h3>
              <p className="text-gray-600 mb-4">
                Специализированная уборка для удаления строительной пыли, грязи и следов ремонтных работ.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Удаление строительной пыли</li>
                <li>• Мытье окон от грязи и клея</li>
                <li>• Очистка радиаторов и вентиляции</li>
                <li>• Финальная полировка поверхностей</li>
              </ul>
            </div>
          </section>

          {/* Что входит в уборку */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Что входит в уборку квартиры</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🏠 Жилые комнаты</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Влажная уборка всех поверхностей от пыли</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье полов с использованием профессиональных средств</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Очистка плинтусов, дверей, выключателей</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье зеркал и стеклянных поверхностей</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Пылесос ковров и мягкой мебели</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Кухня</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье рабочих поверхностей и столешниц</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Очистка плиты, духовки, микроволновки снаружи</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье раковины и смесителя</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Очистка фасадов кухонной мебели</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье кафельной плитки и фартука</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🚿 Санузел</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Дезинфекция унитаза, биде</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье ванны/душевой кабины</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Очистка раковины и смесителя</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Мытье кафеля и межплиточных швов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Полировка зеркал и хромированных поверхностей</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Дополнительно</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Вынос мусора и смена мусорных пакетов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Проветривание помещений</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Расстановка обуви и мелких предметов</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Использование профессиональных eco-средств</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Преимущества K-lining */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Почему выбирают K-lining для уборки квартир</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Быстрый выезд</h3>
                <p className="text-gray-600 text-sm">Работаем 24/7. Срочный выезд в течение 2-4 часов</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Гарантия качества</h3>
                <p className="text-gray-600 text-sm">Не устраивает результат — переделаем бесплатно</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Честные цены</h3>
                <p className="text-gray-600 text-sm">Никаких скрытых доплат. Цена не изменится</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧽</span>
                </div>
                <h3 className="font-semibold mb-2">Свои материалы</h3>
                <p className="text-gray-600 text-sm">Профессиональная химия и оборудование</p>
              </div>
            </div>
          </section>

          {/* FAQ секция */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Часто задаваемые вопросы</h2>
            
            <div className="space-y-6">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Сколько стоит уборка квартиры в Москве?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Стоимость уборки квартиры в Москве начинается от 3500₽ за однокомнатную квартиру при поддерживающей уборке. 
                  Точная цена зависит от:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Площади квартиры и количества комнат</li>
                    <li>Типа уборки (поддерживающая, генеральная, после ремонта)</li>
                    <li>Состояния помещения и степени загрязнения</li>
                    <li>Дополнительных услуг (мытье окон, химчистка и т.д.)</li>
                  </ul>
                  <p className="mt-2">Воспользуйтесь нашим <Link href="/calculator" className="text-blue-600 underline">онлайн-калькулятором</Link> для быстрого расчета стоимости.</p>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Какие виды уборки квартир вы предлагаете?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Мы предлагаем три основных вида уборки квартир:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Поддерживающая уборка</strong> — регулярная уборка для поддержания чистоты</li>
                    <li><strong>Генеральная уборка</strong> — глубокая чистка всех поверхностей и техники</li>
                    <li><strong>Уборка после ремонта</strong> — удаление строительной пыли и загрязнений</li>
                  </ul>
                  <p className="mt-2">Также доступны дополнительные услуги: мытье окон, химчистка мебели, уборка балконов.</p>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Как быстро может приехать клинер?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Мы работаем 24/7 и предлагаем:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Срочный выезд</strong> — в течение 2-4 часов (с доплатой 50%)</li>
                    <li><strong>В день обращения</strong> — в свободное время клинера</li>
                    <li><strong>Плановая запись</strong> — на удобное для вас время</li>
                  </ul>
                  <p className="mt-2">Звоните по телефону <a href="tel:+79255551833" className="text-blue-600 font-semibold">+7 (925) 555-18-33</a> или заказывайте онлайн.</p>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Какая гарантия на уборку квартиры?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Мы предоставляем полную гарантию качества на все виды работ:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Если результат не устраивает — <strong>бесплатно переделаем в течение 24 часов</strong></li>
                    <li>Страхование ответственности на 1 млн рублей</li>
                    <li>Контроль качества от супервайзера</li>
                    <li>Возможность оценить работу до оплаты</li>
                  </ul>
                </div>
              </details>
            </div>
          </section>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-700 mb-4">
              Нужна подробная информация о процессе уборки и дополнительных услугах? 
            </p>
            <p>
              Смотрите детальное описание: <Link href="/services/apartment-cleaning" className="text-primary-600 font-semibold hover:underline">Уборка квартиры — полный сервис</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


