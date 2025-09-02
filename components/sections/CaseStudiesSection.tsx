import ProgressiveImage from '@/components/ui/ProgressiveImage';

export default function CaseStudiesSection() {
  const cases = [
    {
      title: 'Генеральная уборка 2-к квартиры',
      before: '/og-image.jpg',
      after: '/og-image-new.webp',
      area: '57 м²',
      time: '3.5 часа',
      district: 'Басманный',
      quote: 'Сделали аккуратно и быстро. Без лишних разговоров — качество топ.'
    },
    {
      title: 'После ремонта: студия',
      before: '/og-image.webp',
      after: '/og-image.jpg',
      area: '32 м²',
      time: '4 часа',
      district: 'Тверской',
      quote: 'Пыль и следы строительных работ убрали полностью. Доволен результатом.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наши работы — до/после</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Реальные кейсы. Честные цифры по времени и площади.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((c, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{c.title}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-2">До</div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <ProgressiveImage 
                      src={c.before} 
                      alt={`${c.title} — до`} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 1024px) 100vw, 50vw" 
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">После</div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <ProgressiveImage 
                      src={c.after} 
                      alt={`${c.title} — после`} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 1024px) 100vw, 50vw" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 px-3 py-1">Площадь: {c.area}</span>
                <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1">Время: {c.time}</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1">Район: {c.district}</span>
              </div>

              <blockquote className="text-gray-700 italic border-l-4 border-primary-200 pl-4">“{c.quote}”</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


