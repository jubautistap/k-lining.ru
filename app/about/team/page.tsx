import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наша команда - K-lining',
  description: 'Познакомьтесь с нашей командой профессионалов клининговой компании K-lining в Москве',
};

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Наша команда</h1>
      <p className="text-gray-600">
        Страница находится в разработке. Скоро здесь появится информация о нашей команде.
      </p>
    </div>
  );
} 