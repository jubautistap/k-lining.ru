import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Карьера - K-lining',
  description: 'Присоединяйтесь к команде клининговой компании K-lining в Москве',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Карьера в K-lining</h1>
      <p className="text-gray-600">
        Страница находится в разработке. Скоро здесь появится информация о вакансиях.
      </p>
    </div>
  );
} 