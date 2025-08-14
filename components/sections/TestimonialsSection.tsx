import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Алексей, Тверской',
      text: 'Заказал генеральную уборку после арендаторов. Приехали быстро, сделали чисто. Отношение к вещам аккуратное.',
      rating: 5
    },
    {
      name: 'Мария, Басманный',
      text: 'Мытьё окон и химчистка дивана — всё как договаривались, цена не менялась. Результатом довольна.',
      rating: 5
    },
    {
      name: 'Иван, Пресненский',
      text: 'Регулярная поддерживающая уборка офиса ночью — удобно, не мешают работе. Рекомендую.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Коротко и по делу. Что говорят о нас клиенты из разных районов Москвы.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-800 mb-4">{t.text}</p>
              <div className="text-sm font-semibold text-gray-700">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


