#!/bin/bash

# Деплой скрипт для K-lining
# Автоматически обновляет git, пересобирает проект и перезапускает сервер

echo "🚀 Начинаем деплой K-lining..."

# Настройки сервера
SERVER_HOST="80.87.201.107"
SERVER_USER="root"
SERVER_PATH="/var/www/kliningpro"
PM2_APP_NAME="kliningpro"
# Ветка для деплоя:
# 1) если задано переменной окружения BRANCH — используем её
# 2) иначе пытаемся взять текущую локальную ветку репозитория
# 3) по умолчанию — main
LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
BRANCH="${BRANCH:-${LOCAL_BRANCH:-main}}"

# Опционально: пушим локальные изменения перед деплоем, если AUTO_PUSH=1
AUTO_PUSH=${AUTO_PUSH:-0}

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

# Локальная диагностика ветки/коммита
LOCAL_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
print_status "Локальная ветка: $BRANCH (commit: $LOCAL_COMMIT)"

# Проверяем, есть ли удалённая ветка origin/$BRANCH
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  print_status "Удалённая ветка origin/$BRANCH существует"
else
  print_warning "Удалённая ветка origin/$BRANCH не найдена — будет создана при пуше"
fi

# Если включён авто-пуш — отправим локальную ветку перед деплоем
if [ "$AUTO_PUSH" = "1" ]; then
  print_status "Автопубликация локальной ветки в origin ($BRANCH)"
  if ! git push -u origin "$BRANCH"; then
    print_error "Не удалось выполнить git push локальной ветки $BRANCH"
    exit 1
  fi
else
  print_warning "AUTO_PUSH=0 — пропускаю локальный git push. Убедитесь, что origin/$BRANCH актуальна."
fi

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
print_status "Сохраняем текущие изменения (если есть)..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && if [ -n \"$(git status --porcelain)\" ]; then git stash push -m 'Автосохранение перед деплоем'; fi"

# Обновляем git
print_status "Обновляем git репозиторий (ветка: $BRANCH)..."
# Жестко синхронизируем локальную ветку с origin/$BRANCH
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && git fetch --all --prune"
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && \
  git fetch --all --prune && \
  if git show-ref --verify --quiet refs/remotes/origin/$BRANCH; then \
    echo '→ Найдена origin/$BRANCH'; \
    git checkout -B $BRANCH origin/$BRANCH; \
  else \
    echo '→ origin/$BRANCH не найдена; переключаемся на origin/main'; \
    git checkout -B main origin/main; \
  fi && \
  echo 'Текущий серверный коммит:' && git --no-pager log -1 --oneline"

if [ $? -eq 0 ]; then
    print_status "Git успешно обновлен! Текущая ветка: $BRANCH"
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
# Вытаскиваем переменные окружения для диагностики
print_status "ENV preview (локально): $(grep -E '^(NEXT_PUBLIC|NODE_ENV)' .env 2>/dev/null | sed 's/=.*/=*** /')"
# postbuild (next-sitemap) запустится автоматически как lifecycle-скрипт после build
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && \
  echo 'ENV preview (server .env):' && (grep -E '^(NEXT_PUBLIC|NODE_ENV)' .env 2>/dev/null | sed 's/=.*/=*** /' || echo 'нет .env') && \
  if ls prisma/migrations/*/migration.sql >/dev/null 2>&1; then echo 'Found migrations → running migrate deploy'; npx prisma migrate deploy; else echo 'No migrations found → running prisma generate only'; npx prisma generate; fi && \
  npm ci && npm run build && npm run postbuild:yandex"

if [ $? -eq 0 ]; then
    print_status "Проект успешно собран!"
else
    print_error "Ошибка при сборке проекта"
    exit 1
fi

# Перезапускаем PM2 процесс точечно для выбранной ветки
print_status "Перезапускаем PM2 процесс..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && \
  CURRENT=$(git rev-parse --abbrev-ref HEAD); \
  echo 'Серверная ветка:' $CURRENT; \
  pm2 restart $PM2_APP_NAME --update-env && sleep 2 && bash scripts/warmup-urls.sh http://localhost:3000 || true"

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