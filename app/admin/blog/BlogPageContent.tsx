'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  ArrowLeft,
  Eye,
  Calendar,
  Tag
} from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  image?: string;
  isPublished: boolean;
  slug: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    readTime: '5 мин',
    isPublished: false,
    image: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/blog', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      // Error loading posts
    }
  };

  const handleSave = async (post: BlogPost) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        await loadPosts();
        setIsEditing(null);
        setEditingPost(null);
      }
    } catch (error) {
      // Error saving post
    }
  };

  const handleImageUpload = async (file: File, onUrl: (url: string) => void) => {
    try {
      const token = localStorage.getItem('accessToken');
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/blog/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } as any : undefined,
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'upload failed');
      onUrl(data.url);
    } catch (e) {
      alert('Ошибка загрузки изображения');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту статью?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (response.ok) {
        await loadPosts();
      }
    } catch (error) {
      // Error deleting post
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        await loadPosts();
        setIsAdding(false);
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          tags: [],
          readTime: '5 мин',
          isPublished: false
        });
      }
    } catch (error) {
      // Error adding post
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Управление блогом</h1>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить статью</span>
        </button>
      </div>
        {/* Posts List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Статьи ({posts.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6"
              >
                {isEditing === post.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Заголовок
                        </label>
                        <input
                          type="text"
                          value={editingPost?.title || ''}
                          onChange={(e) => setEditingPost({ ...editingPost!, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Категория
                        </label>
                        <input
                          type="text"
                          value={editingPost?.category || ''}
                          onChange={(e) => setEditingPost({ ...editingPost!, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Краткое описание
                      </label>
                      <textarea
                        value={editingPost?.excerpt || ''}
                        onChange={(e) => setEditingPost({ ...editingPost!, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Содержание
                      </label>
                      <textarea
                        value={editingPost?.content || ''}
                        onChange={(e) => setEditingPost({ ...editingPost!, content: e.target.value })}
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Время чтения
                        </label>
                        <input
                          type="text"
                          value={editingPost?.readTime || ''}
                          onChange={(e) => setEditingPost({ ...editingPost!, readTime: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="5 мин"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Обложка (URL)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingPost?.image || ''}
                            onChange={(e) => setEditingPost({ ...editingPost!, image: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="/uploads/blog/....jpg"
                          />
                        </div>
                        <div className="mt-2">
                          <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleImageUpload(f, (url) => setEditingPost({ ...editingPost!, image: url }));
                              }}
                            />
                            Загрузить файл
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Теги (через запятую)
                        </label>
                        <input
                          type="text"
                          value={editingPost?.tags?.join(', ') || ''}
                          onChange={(e) => setEditingPost({ ...editingPost!, tags: e.target.value.split(',').map(t => t.trim()) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="уборка, советы, клининг"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Статус
                        </label>
                        <select
                          value={editingPost?.isPublished ? 'published' : 'draft'}
                          onChange={(e) => setEditingPost({ ...editingPost!, isPublished: e.target.value === 'published' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="draft">Черновик</option>
                          <option value="published">Опубликована</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          setEditingPost(null);
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSave(editingPost!)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Сохранить</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {post.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {post.isPublished ? 'Опубликована' : 'Черновик'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tag className="w-3 h-3" />
                              <span>{post.category}</span>
                            </div>
                            <span>⏱️ {post.readTime}</span>
                          </div>
                          
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Просмотр"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setIsEditing(post.id);
                          setEditingPost(post);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Статьи не найдены</p>
            </div>
          )}
        </div>

        {/* Add New Post Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Добавить статью</h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Заголовок статьи"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <input
                    type="text"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Советы"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Краткое описание
                  </label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Краткое описание статьи..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Содержание
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Содержание статьи..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Время чтения
                    </label>
                    <input
                      type="text"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="5 мин"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Теги (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newPost.tags?.join(', ') || ''}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="уборка, советы, клининг"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Обложка (URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newPost.image}
                        onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="/uploads/blog/....jpg"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleImageUpload(f, (url) => setNewPost({ ...newPost, image: url }));
                          }}
                        />
                        Загрузить файл
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAdd}
                  className="btn-primary"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
  );
}