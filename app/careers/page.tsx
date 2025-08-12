import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Карьера - K-lining',
  description: 'Присоединяйтесь к команде клининговой компании K-lining в Москве',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center text-gray-600">
      <h1 className="text-3xl font-bold mb-4">Страница в разработке</h1>
      <p className="mb-2">Скоро здесь появится информация о вакансиях.</p>
      <a href="/" className="text-primary-600 hover:underline">На главную</a>
    </div>
  );
} 