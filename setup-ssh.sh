#!/bin/bash

# Скрипт для настройки SSH ключей
# Позволяет деплоить без ввода пароля

echo "🔑 Настраиваем SSH ключи для автоматического деплоя..."

# Настройки сервера
SERVER_HOST="80.87.201.107"
SERVER_USER="root"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверяем существование SSH ключа
if [ ! -f ~/.ssh/id_rsa ]; then
    print_status "SSH ключ не найден. Создаем новый..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
    print_status "SSH ключ создан!"
else
    print_status "SSH ключ уже существует."
fi

# Копируем публичный ключ на сервер
print_status "Копируем SSH ключ на сервер..."
print_warning "Введите пароль от сервера один раз для настройки:"

ssh-copy-id -i ~/.ssh/id_rsa.pub $SERVER_USER@$SERVER_HOST

if [ $? -eq 0 ]; then
    print_status "SSH ключ успешно скопирован на сервер!"
    print_status "Теперь деплой будет работать без пароля!"
else
    print_error "Ошибка при копировании SSH ключа"
    exit 1
fi

# Тестируем подключение без пароля
print_status "Тестируем подключение без пароля..."
ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_HOST "echo 'Подключение без пароля работает!'"

if [ $? -eq 0 ]; then
    print_status "✅ SSH настройка завершена успешно!"
    print_status "Теперь можно использовать ./deploy.sh без пароля!"
else
    print_error "❌ SSH настройка не удалась"
    exit 1
fi 