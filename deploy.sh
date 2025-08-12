#!/bin/bash

# Деплой скрипт для KliningPro
# Автоматически обновляет git, пересобирает проект и перезапускает сервер

echo "🚀 Начинаем деплой KliningPro..."

# Настройки сервера
SERVER_HOST="80.87.201.107"
SERVER_USER="root"
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

# Запускаем SSH агент если не запущен
print_status "Настраиваем SSH агент..."
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa 2>/dev/null

# Проверяем подключение к серверу
print_status "Проверяем подключение к серверу..."
if ! ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_HOST "echo 'Подключение успешно'" 2>/dev/null; then
    print_error "Не удается подключиться к серверу $SERVER_HOST"
    print_warning "Запустите ./setup-ssh.sh для настройки SSH ключей"
    exit 1
fi

print_status "Подключение к серверу успешно!"

# Переходим в папку проекта на сервере
print_status "Переходим в папку проекта..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH" || {
    print_error "Не удается перейти в папку $SERVER_PATH"
    exit 1
}

# Сохраняем текущие изменения если есть
print_status "Сохраняем текущие изменения..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && git stash push -m 'Автосохранение перед деплоем'"

# Обновляем git
print_status "Обновляем git репозиторий..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && git fetch origin"
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && git reset --hard origin/main"

if [ $? -eq 0 ]; then
    print_status "Git успешно обновлен!"
else
    print_error "Ошибка при обновлении git"
    exit 1
fi

# Копируем локальные CSV (если скрипт запускается с мака и папка существует)
if [ -d "./SEo" ]; then
  print_status "Загружаем SEo/ (CSV) на сервер через rsync..."
  # Чистим удалённую папку один раз, чтобы устранить рекурсивные вложения прошлых заливок
  ssh $SERVER_USER@$SERVER_HOST "rm -rf $SERVER_PATH/SEo && mkdir -p $SERVER_PATH/SEo"
  rsync -az --delete-after \
    --exclude '.DS_Store' \
    --exclude '._*' \
    --exclude '.git*' \
    -e "ssh" ./SEo/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/SEo/ || \
    print_warning "Не удалось загрузить SEo/ (rsync), продолжаем без CSV"
else
  print_warning "Локальная папка ./SEo не найдена — пропускаю загрузку CSV"
fi

# Устанавливаем зависимости
print_status "Устанавливаем зависимости..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm ci"

if [ $? -eq 0 ]; then
    print_status "Зависимости установлены!"
else
    print_error "Ошибка при установке зависимостей"
    exit 1
fi

# Собираем проект
print_status "Собираем проект..."
# postbuild (next-sitemap) запустится автоматически как lifecycle-скрипт после build
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && if ls prisma/migrations/*/migration.sql >/dev/null 2>&1; then echo 'Found migrations → running migrate deploy'; npx prisma migrate deploy; else echo 'No migrations found → running prisma generate only'; npx prisma generate; fi && npm run build && npm run postbuild:yandex"

if [ $? -eq 0 ]; then
    print_status "Проект успешно собран!"
else
    print_error "Ошибка при сборке проекта"
    exit 1
fi

# Перезапускаем PM2 процесс
print_status "Перезапускаем PM2 процесс..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && pm2 restart $PM2_APP_NAME --update-env && sleep 2 && bash scripts/warmup-urls.sh http://localhost:3000 || true"

if [ $? -eq 0 ]; then
    print_status "PM2 процесс перезапущен!"
else
    print_error "Ошибка при перезапуске PM2"
    exit 1
fi

# Проверяем статус
print_status "Проверяем статус приложения..."
ssh $SERVER_USER@$SERVER_HOST "pm2 status"

print_status "Деплой завершен успешно! 🎉"
print_status "Сайт должен быть доступен по адресу: https://k-lining.ru" 