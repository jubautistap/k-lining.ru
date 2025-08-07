'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  Eye,
  Trash2,
  ArrowLeft,
  Filter,
  Search,
  Download
} from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  contactedAt?: string;
  notes?: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadLeads = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/leads', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filterLeads = React.useCallback(() => {
    let filtered = leads;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  }, [leads, statusFilter, searchTerm]);

  useEffect(() => {
    filterLeads();
  }, [filterLeads]);

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        await loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm('Удалить эту заявку?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (response.ok) {
        await loadLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'contacted': return 'Связались';
      case 'confirmed': return 'Подтверждена';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка заявок...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Управление заявками</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            Всего: {leads.length} | Новых: {leads.filter(l => l.status === 'new').length}
          </span>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Имя, телефон, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Все статусы</option>
                <option value="new">Новые</option>
                <option value="contacted">Связались</option>
                <option value="confirmed">Подтверждены</option>
                <option value="completed">Завершены</option>
                <option value="cancelled">Отменены</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={loadLeads}
                className="btn-primary w-full"
              >
                Обновить
              </button>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Заявки ({filteredLeads.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {lead.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {getStatusText(lead.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{lead.phone}</span>
                          </div>
                          
                          {lead.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                          
                          {lead.service && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">Услуга:</span>
                              <span>{lead.service}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(lead.createdAt).toLocaleString('ru-RU')}</span>
                          </div>
                        </div>
                        
                        {lead.message && (
                          <p className="text-sm text-gray-500 mt-2">
                            {lead.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="new">Новая</option>
                      <option value="contacted">Связались</option>
                      <option value="confirmed">Подтверждена</option>
                      <option value="completed">Завершена</option>
                      <option value="cancelled">Отменена</option>
                    </select>
                    
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Просмотр деталей"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                {leads.length === 0 ? 'Заявок пока нет' : 'Заявки не найдены'}
              </p>
              <p className="text-sm text-gray-400">
                {leads.length === 0 
                  ? 'Когда пользователи будут оставлять заявки через сайт, они появятся здесь'
                  : 'Попробуйте изменить фильтры или поисковый запрос'
                }
              </p>
            </div>
          )}
        </div>

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Детали заявки</h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <p className="text-gray-900">{selectedLead.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <p className="text-gray-900">{selectedLead.phone}</p>
                </div>
                
                {selectedLead.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedLead.email}</p>
                  </div>
                )}
                
                {selectedLead.service && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Услуга</label>
                    <p className="text-gray-900">{selectedLead.service}</p>
                  </div>
                )}
                
                {selectedLead.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                    <p className="text-gray-900">{selectedLead.message}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата создания</label>
                  <p className="text-gray-900">{new Date(selectedLead.createdAt).toLocaleString('ru-RU')}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                    {getStatusText(selectedLead.status)}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Закрыть
                </button>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="btn-primary"
                >
                  Позвонить
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
  );
}