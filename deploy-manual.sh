#!/bin/bash

# Ручной деплой скрипт для KliningPro
# Выполняется на сервере для обновления сайта

echo "🚀 Начинаем деплой KliningPro..."

# Настройки
PROJECT_PATH="/var/www/kliningpro"
PM2_APP_NAME="kliningpro"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода с цветом
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверяем что мы в правильной папке
if [ ! -d "$PROJECT_PATH" ]; then
    print_error "Папка $PROJECT_PATH не найдена!"
    exit 1
fi

cd $PROJECT_PATH
print_status "Перешли в папку: $PROJECT_PATH"

# Сохраняем текущие изменения если есть
print_status "Сохраняем текущие изменения..."
git stash push -m "Автосохранение перед деплоем"

# Обновляем git
print_status "Обновляем git репозиторий..."
git fetch origin
git reset --hard origin/main

if [ $? -eq 0 ]; then
    print_status "Git успешно обновлен!"
else
    print_error "Ошибка при обновлении git"
    exit 1
fi

# Устанавливаем зависимости
print_status "Устанавливаем зависимости..."
npm install

if [ $? -eq 0 ]; then
    print_status "Зависимости установлены!"
else
    print_error "Ошибка при установке зависимостей"
    exit 1
fi

# Собираем проект
print_status "Собираем проект..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Проект успешно собран!"
else
    print_error "Ошибка при сборке проекта"
    exit 1
fi

# Перезапускаем PM2 процесс
print_status "Перезапускаем PM2 процесс..."
pm2 restart $PM2_APP_NAME

if [ $? -eq 0 ]; then
    print_status "PM2 процесс перезапущен!"
else
    print_error "Ошибка при перезапуске PM2"
    exit 1
fi

# Проверяем статус
print_status "Проверяем статус приложения..."
pm2 status

print_status "Деплой завершен успешно! 🎉"
print_status "Сайт должен быть доступен по адресу: https://k-lining.ru" 