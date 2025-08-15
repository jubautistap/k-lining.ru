import { Building2, MapPin, Users, CheckCircle, Clock } from 'lucide-react';

export default function LoftCentersCaseSection() {
  const highlights = [
    { icon: Building2, label: '3 лофт-центра', desc: 'крупнейшие в Москве' },
    { icon: Users, label: '100+ лофтов', desc: 'регулярное обслуживание' },
    { icon: CheckCircle, label: 'SLA зафиксирован', desc: 'чёткие регламенты работ' },
    { icon: Clock, label: 'Ночная уборка', desc: 'без остановки мероприятий' }
  ];

  const scope = [
    'Ежедневная поддерживающая уборка общих пространств',
    'Подготовка залов к мероприятиям и пост-ивент уборка',
    'Стекло, витрины, санузлы, складские зоны',
    'Экстренные выезды 24/7 по заявке администратора'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Кейс: уборка 3 крупнейших лофт‑центров Москвы
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Обслуживаем свыше 100 лофтов с разной проходимостью. Работаем по SLA, гибкие графики, ночные смены — без помех для мероприятий.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mr-3">
                <Building2 className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">Инфраструктура</div>
                <div className="text-sm text-gray-600">Холлы, коридоры, тех. помещения, санузлы, витрины</div>
              </div>
            </div>
            <ul className="space-y-2 text-gray-700">
              {scope.map((s) => (
                <li key={s} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mr-3">
                <MapPin className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">Формат обслуживания</div>
                <div className="text-sm text-gray-600">Москва и МО, гибкие слоты, работа в пиковые даты</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center mb-1">
                    <h.icon className="w-4 h-4 text-primary-700 mr-2" />
                    <div className="font-semibold text-gray-900 text-sm">{h.label}</div>
                  </div>
                  <div className="text-xs text-gray-600">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="/contacts" className="btn-primary px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto inline-block">Обсудить подключение лофт‑центра</a>
          <div className="text-sm text-gray-600 mt-3">Подскажем график, расчёт штата и регламенты под ваш объект</div>
        </div>
      </div>
    </section>
  );
}


