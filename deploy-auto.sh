#!/bin/bash

# Автоматический деплой скрипт для KliningPro
# Автоматически обновляет git, пересобирает проект и перезапускает сервер

echo "🚀 Начинаем автоматический деплой KliningPro..."

# Настройки сервера
SERVER_HOST="80.87.201.107"
SERVER_USER="root"
SERVER_PASS="456258kk"
SERVER_PATH="/var/www/kliningpro"
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

# Функция для выполнения команд на сервере с автоматическим вводом пароля
ssh_with_pass() {
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "$1"
}

# Проверяем подключение к серверу
print_status "Проверяем подключение к серверу..."
if ssh_with_pass "echo 'Подключение успешно'" 2>/dev/null; then
    print_status "Подключение к серверу успешно!"
else
    print_error "Не удается подключиться к серверу $SERVER_HOST"
    exit 1
fi

# Переходим в папку проекта на сервере
print_status "Переходим в папку проекта..."
ssh_with_pass "cd $SERVER_PATH" || {
    print_error "Не удается перейти в папку $SERVER_PATH"
    exit 1
}

# Сохраняем текущие изменения если есть
print_status "Сохраняем текущие изменения..."
ssh_with_pass "cd $SERVER_PATH && git stash push -m 'Автосохранение перед деплоем'"

# Обновляем git
print_status "Обновляем git репозиторий..."
ssh_with_pass "cd $SERVER_PATH && git fetch origin"
ssh_with_pass "cd $SERVER_PATH && git reset --hard origin/main"

if [ $? -eq 0 ]; then
    print_status "Git успешно обновлен!"
else
    print_error "Ошибка при обновлении git"
    exit 1
fi

# Копируем .env.production в .env на сервере
print_status "Настраиваем переменные окружения..."
ssh_with_pass "cd $SERVER_PATH && cp .env.production .env"

# Устанавливаем зависимости
print_status "Устанавливаем зависимости..."
ssh_with_pass "cd $SERVER_PATH && npm install"

if [ $? -eq 0 ]; then
    print_status "Зависимости установлены!"
else
    print_error "Ошибка при установке зависимостей"
    exit 1
fi

# Собираем проект
print_status "Собираем проект..."
ssh_with_pass "cd $SERVER_PATH && npm run build"

if [ $? -eq 0 ]; then
    print_status "Проект успешно собран!"
else
    print_error "Ошибка при сборке проекта"
    exit 1
fi

# Перезапускаем PM2 процесс
print_status "Перезапускаем PM2 процесс..."
ssh_with_pass "pm2 restart $PM2_APP_NAME"

if [ $? -eq 0 ]; then
    print_status "PM2 процесс перезапущен!"
else
    print_error "Ошибка при перезапуске PM2"
    exit 1
fi

# Проверяем статус
print_status "Проверяем статус приложения..."
ssh_with_pass "pm2 status"

print_status "Деплой завершен успешно! 🎉"
print_status "Сайт должен быть доступен по адресу: https://k-lining.ru" 