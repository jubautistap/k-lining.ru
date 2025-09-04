import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import OpenWizardButton from '@/components/ui/OpenWizardButton';
import StructuredData from '@/components/seo/StructuredData';
import ReviewSchema from '@/components/ui/ReviewSchema';

export const metadata: Metadata = {
  title: 'Химчистка мебели в Москве — цены и заказ | K-lining 24/7',
  description: 'Химчистка мебели в Москве: диваны, кресла, матрасы на дому. Удаление пятен и запахов, быстрая сушка. Безопасно для детей ⭐',
  keywords: 'химчистка мебели москва, химчистка дивана москва, чистка ковров москва',
  alternates: { canonical: 'https://k-lining.ru/himchistka-mebeli-moskva' },
  openGraph: {
    title: 'Химчистка мебели — K-lining',
    description: 'Глубокая чистка обивки, удаление пятен и запахов. Профоборудование и безопасные составы.',
    url: 'https://k-lining.ru/himchistka-mebeli-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Химчистка мебели' }],
  },
};

export default function FurnitureDryCleaningMoscowPage() {
  return (
    <>
      {/* Reviews Schema for rich snippets */}
      <ReviewSchema />
      
      {/* Structured Data для химчистки мебели */}
      <StructuredData 
        type="Service"
        data={{
          name: "Химчистка мебели в Москве",
          description: "Профессиональная химчистка мягкой мебели: диваны, кресла, матрасы, ковры. Удаление пятен, запахов. Эко-безопасные технологии.",
          serviceType: "Химчистка мебели",
          startingPrice: "2500",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "RUB",
            lowPrice: "2500",
            highPrice: "8000",
            offers: [
              {
                "@type": "Offer",
                name: "Химчистка дивана 2-местного",
                price: "3500",
                priceCurrency: "RUB"
              },
              {
                "@type": "Offer", 
                name: "Химчистка ковра 3х4м",
                price: "4500",
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
            question: "Сколько стоит химчистка дивана в Москве?",
            answer: "Стоимость химчистки дивана в Москве от 2500₽ за кресло, от 3500₽ за двухместный диван. Цена зависит от размера, материала обивки и степени загрязнения."
          },
          {
            question: "Какие пятна вы можете удалить с мебели?",
            answer: "Мы удаляем большинство пятен: от еды и напитков, следы жира, краски, чернил, следы домашних животных, кровь. Используем специальные составы для каждого типа загрязнений."
          },
          {
            question: "Безопасна ли химчистка для детей и животных?",
            answer: "Да, мы используем только эко-безопасные средства без токсичных компонентов. После обработки мебель полностью безопасна для детей и домашних животных."
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
              <li className="text-gray-900">Химчистка мебели</li>
            </ol>
          </nav>

          <header className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Химчистка мебели в Москве</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              <strong>Профессиональная химчистка мягкой мебели</strong> — диваны, кресла, стулья, матрасы, ковры. 
              Удаляем любые пятна и запахи с помощью <strong>эко-безопасных технологий</strong>. Выезд на дом, быстро и качественно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="btn-primary px-8 py-4 text-lg">Рассчитать стоимость</Link>
              <OpenWizardButton className="btn-secondary px-8 py-4 text-lg" ctaId="himchistka_mebeli_cta">Заказать чистку</OpenWizardButton>
            </div>
          </header>

          {/* Цены на химчистку мебели */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Цены на химчистку мебели</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🛋️ Мягкая мебель</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Кресло (1-местное)</span>
                    <span className="font-semibold">от 2500₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Диван 2-местный</span>
                    <span className="font-semibold">от 3500₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Диван 3-местный</span>
                    <span className="font-semibold">от 4500₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Угловой диван</span>
                    <span className="font-semibold">от 6000₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Матрас односпальный</span>
                    <span className="font-semibold">от 2800₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Матрас двуспальный</span>
                    <span className="font-semibold">от 3800₽</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">🏠 Ковры и напольные покрытия</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Ковер до 2х3 м</span>
                    <span className="font-semibold">от 2500₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Ковер до 3х4 м</span>
                    <span className="font-semibold">от 4500₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Ковер свыше 4х5 м</span>
                    <span className="font-semibold">от 7000₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Ковролин (за м²)</span>
                    <span className="font-semibold">от 350₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span>Стул с мягким сиденьем</span>
                    <span className="font-semibold">от 800₽</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Офисное кресло</span>
                    <span className="font-semibold">от 1500₽</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>В цену включено:</strong> диагностика загрязнений, предварительная обработка пятен, 
                глубокая чистка профессиональным оборудованием, ускоренная сушка.
              </p>
            </div>
          </section>

          {/* Технологии и методы */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Экстракционная чистка</h3>
              <p className="text-gray-600 mb-4">
                Глубокое проникновение чистящих растворов с последующим извлечением загрязнений вместе с влагой.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Удаление глубоких загрязнений</li>
                <li>• Восстановление цвета ткани</li>
                <li>• Устранение запахов изнутри</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Эко-безопасные средства</h3>
              <p className="text-gray-600 mb-4">
                Используем только сертифицированные составы без агрессивной химии, безопасные для детей и животных.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Гипоаллергенные формулы</li>
                <li>• Биоразлагаемые компоненты</li>
                <li>• Без токсичных веществ</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ускоренная сушка</h3>
              <p className="text-gray-600 mb-4">
                Специальное оборудование для быстрого высушивания — мебель готова к использованию через 2-4 часа.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Профессиональные осушители</li>
                <li>• Вентиляция и обогрев</li>
                <li>• Без разводов и потеков</li>
              </ul>
            </div>
          </section>

          {/* Виды загрязнений и пятен */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Какие пятна мы удаляем</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🍷</span>
                </div>
                <h4 className="font-semibold mb-2">Еда и напитки</h4>
                <p className="text-sm text-gray-600">Кофе, вино, соки, жир, шоколад</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🖊️</span>
                </div>
                <h4 className="font-semibold mb-2">Краски и чернила</h4>
                <p className="text-sm text-gray-600">Ручки, фломастеры, акварель, гуашь</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="font-semibold mb-2">От животных</h4>
                <p className="text-sm text-gray-600">Моча, слюна, шерсть, специфические запахи</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🩸</span>
                </div>
                <h4 className="font-semibold mb-2">Биологические</h4>
                <p className="text-sm text-gray-600">Кровь, пот, рвота, другие выделения</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700 text-lg">
                <strong>Гарантия удаления:</strong> Если пятно не удалилось — не берем за это деньги!
              </p>
            </div>
          </section>

          {/* Процесс работы */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Как проходит химчистка мебели</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
                <h4 className="font-semibold mb-2">Диагностика</h4>
                <p className="text-sm text-gray-600">Определяем тип ткани, степень загрязнения, подбираем средства</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
                <h4 className="font-semibold mb-2">Предобработка</h4>
                <p className="text-sm text-gray-600">Локальная обработка пятен специальными составами</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
                <h4 className="font-semibold mb-2">Глубокая чистка</h4>
                <p className="text-sm text-gray-600">Экстракционная чистка с профессиональным оборудованием</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
                <h4 className="font-semibold mb-2">Сушка</h4>
                <p className="text-sm text-gray-600">Ускоренная сушка, мебель готова через 2-4 часа</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Частые вопросы</h2>
            
            <div className="space-y-6">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Сколько стоит химчистка дивана в Москве?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Стоимость химчистки дивана в Москве зависит от размера и сложности:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>2-местный диван — от 3500₽</li>
                    <li>3-местный диван — от 4500₽</li>
                    <li>Угловой диван — от 6000₽</li>
                  </ul>
                  <p className="mt-2">Дополнительная обработка сложных пятен может потребовать доплаты 500-1000₽.</p>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Какие пятна вы можете удалить с мебели?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Мы успешно удаляем большинство типов загрязнений:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Пятна от еды и напитков (кофе, вино, соки)</li>
                    <li>Следы жира и косметики</li>
                    <li>Краски, чернила, фломастеры</li>
                    <li>Биологические загрязнения</li>
                    <li>Следы домашних животных и их запахи</li>
                  </ul>
                  <p className="mt-2"><strong>Гарантия:</strong> если пятно не удалилось — не оплачиваете эту часть работы!</p>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-lg">Безопасна ли химчистка для детей и животных?</summary>
                <div className="mt-3 text-gray-700">
                  <p>Абсолютно безопасна! Мы используем:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Только эко-сертифицированные средства</li>
                    <li>Гипоаллергенные составы без токсинов</li>
                    <li>Биоразлагаемые компоненты</li>
                  </ul>
                  <p className="mt-2">После полного высыхания мебель абсолютно безопасна для использования детьми и домашними животными.</p>
                </div>
              </details>
            </div>
          </section>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-700 mb-4">
              Нужны дополнительные услуги по химчистке?
            </p>
            <p>
              Полный перечень: <Link href="/services/furniture-dry-cleaning" className="text-primary-600 font-semibold hover:underline">Химчистка мебели — все услуги</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


