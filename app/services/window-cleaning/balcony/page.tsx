import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Мытьё окон на балконе и лоджии в Москве — от 600 ₽ за створку | K-lining',
  description: 'Профессиональное мытьё балконных окон и лоджий в Москве: створки, балконные блоки, сетки. Без разводов, безопасно, с допуском на высоте. Цена — от 600 ₽ за створку.',
  alternates: { canonical: 'https://k-lining.ru/services/window-cleaning/balcony' },
  openGraph: {
    title: 'Мытьё окон на балконе/лоджии',
    description: 'Очистка стекол, рам, подоконников, москитных сеток. Выезд сегодня. Честные цены.',
    url: 'https://k-lining.ru/services/window-cleaning/balcony',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Мытьё балконных окон' }],
  },
};

export default function BalconyWindowCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Мытьё окон', url: '/services/window-cleaning' },
          { name: 'Балкон/лоджия', url: '/services/window-cleaning/balcony' },
        ]} />
      </div>

      <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Мытьё балконных окон и лоджий</h1>
            <p className="text-lg opacity-90 mb-6">Створки, балконные блоки, откосы, сетки. Работаем на высоте со страховкой. Выезд в день обращения.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Заказать</Link>
              <Link href="/services/window-cleaning" className="btn-secondary px-6 py-3">Ко всем тарифам</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={50} propertyType="apartment" cleaningType="general" windowsCount={6} />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Что входит</h2>
          <ul>
            <li>Мытьё стекол с обеих сторон, аккуратная полировка без разводов;</li>
            <li>Очистка рам, подоконников и направляющих балконных блоков;</li>
            <li>Мытьё москитных сеток (по согласованию) и удаление паутины;</li>
            <li>Безопасные средства, допуск к высотным работам;</li>
            <li>Бережное обращение с отделкой и остеклением.</li>
          </ul>
          <h2>Цены и факторы</h2>
          <p>Базовый тариф — от 600 ₽ за створку. Балконный блок — от 1 000 ₽. Доплаты возможны при нестандартной высоте, сложном доступе или сильных загрязнениях (следы цемента, герметика).</p>
          <h2>Почему K-lining</h2>
          <p>Мы работаем по всей Москве и области, используем профессиональную химию и инвентарь. Команда приезжает вовремя, все работы выполняются аккуратно и быстро, с гарантией результата.</p>
          <p>Нужна комплексная уборка квартиры с мытьём балкона? Посмотрите <Link href="/services/apartment-cleaning">уборку квартир</Link> и пакетные предложения.</p>
        </div>
      </section>

      <FAQSchema items={[
        { question: 'Сколько створок считать на балконе?', answer: 'Считаем каждую подвижную секцию. Балконный блок считается отдельно (дверь+окно).' },
        { question: 'Делаете ли высотные работы?', answer: 'Да, с допуском и страховкой. Стоимость рассчитывается индивидуально.' },
        { question: 'Нужно ли снимать сетки?', answer: 'По желанию клиента. Мы аккуратно снимем и помоем сетки, затем установим обратно.' },
      ]} />

      <RelatedServicesSection currentService="/services/window-cleaning" />
    </div>
  );
}


