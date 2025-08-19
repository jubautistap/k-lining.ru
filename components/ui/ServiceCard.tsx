import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  duration,
  features,
  popular = false,
  onClick,
  className = ''
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl card-hover ${
        popular
          ? 'border-primary-500 scale-105'
          : 'border-gray-200 hover:border-primary-300'
      } ${className}`}
    >
      {/* Популярный бейдж */}
      {popular && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
          Популярный
        </div>
      )}

      {/* Иконка и заголовок */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Цена и время */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-primary-600">
          {price}
        </div>
        <div className="text-sm text-gray-500">
          Время работы: {duration}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onClick}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          popular
            ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600'
        }`}
      >
        Заказать
      </button>
    </div>
  );
}
