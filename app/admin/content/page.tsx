'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Edit, 
  Save, 
  X, 
  Globe,
  Home,
  DollarSign,
  Calculator,
  MessageSquare,
  BookOpen,
  Info,
  Phone
} from 'lucide-react';

interface ContentSection {
  id: string;
  page: string;
  section: string;
  title: string;
  content: string;
  type: 'text' | 'title' | 'description';
  lastModified: string;
}

export default function ContentPage() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: '1',
      page: 'Главная',
      section: 'hero',
      title: 'Заголовок главной страницы',
      content: 'Профессиональная уборка квартир и офисов в Москве',
      type: 'title',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      page: 'Главная',
      section: 'hero',
      title: 'Описание главной страницы',
      content: 'Мы предлагаем качественные услуги клининга по доступным ценам. Наша команда профессионалов готова выполнить уборку любой сложности.',
      type: 'description',
      lastModified: '2024-01-15'
    },
    {
      id: '3',
      page: 'Услуги',
      section: 'services',
      title: 'Заголовок страницы услуг',
      content: 'Наши услуги',
      type: 'title',
      lastModified: '2024-01-14'
    },
    {
      id: '4',
      page: 'Цены',
      section: 'pricing',
      title: 'Заголовок страницы цен',
      content: 'Тарифы и цены',
      type: 'title',
      lastModified: '2024-01-14'
    }
  ]);

  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [filterPage, setFilterPage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const pages = ['Главная', 'Услуги', 'Цены', 'Калькулятор', 'Блог', 'О нас', 'Контакты', 'Корпоративным клиентам'];

  const filteredSections = sections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPage === 'all' || section.page === filterPage;
    return matchesSearch && matchesFilter;
  });

  const handleSave = (section: ContentSection) => {
    setSections(sections.map(s => s.id === section.id ? section : s));
    setEditingSection(null);
  };

  const getPageIcon = (page: string) => {
    switch (page) {
      case 'Главная': return Home;
      case 'Услуги': return Globe;
      case 'Цены': return DollarSign;
      case 'Калькулятор': return Calculator;
      case 'Блог': return BookOpen;
      case 'О нас': return Info;
      case 'Контакты': return Phone;
      case 'Корпоративным клиентам': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Контент</h1>
          <p className="text-gray-600">Редактирование текстов и заголовков страниц</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по тексту..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Все страницы</option>
              {pages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSections.map((section) => {
          const PageIcon = getPageIcon(section.page);
          const isEditing = editingSection?.id === section.id;
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <PageIcon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{section.page}</h3>
                    <p className="text-sm text-gray-500">{section.section}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(editingSection)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingSection(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingSection(section)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название поля
                  </label>
                  <p className="text-sm text-gray-900">{section.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип
                  </label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    section.type === 'title' ? 'bg-blue-100 text-blue-800' :
                    section.type === 'description' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {section.type === 'title' ? 'Заголовок' :
                     section.type === 'description' ? 'Описание' : 'Текст'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержание
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editingSection.content}
                      onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {section.content}
                    </p>
                  )}
                </div>

                <div className="text-xs text-gray-500">
                  Последнее изменение: {section.lastModified}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Контент не найден</h3>
          <p className="text-gray-500">Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      )}
    </div>
  );
} 