#!/bin/bash

# Скрипт для оптимизации изображений
echo "🖼️  Оптимизация изображений..."

# Создаем резервные копии
mkdir -p public/blog/original
cp public/blog/*.jpg public/blog/original/ 2>/dev/null || true

# Оптимизируем изображения блога
for img in public/blog/*.jpg; do
  if [[ -f "$img" ]]; then
    filename=$(basename "$img" .jpg)
    echo "Оптимизация: $img"
    
    # Сжимаем до разумного размера (800x600) и качества 85%
    sips -Z 800 -s formatOptions 85 "$img" --out "public/blog/${filename}-optimized.jpg"
    
    # Заменяем оригинал оптимизированной версией
    mv "public/blog/${filename}-optimized.jpg" "$img"
  fi
done

echo "✅ Оптимизация изображений завершена!"

# Показываем результат
echo "📊 Размеры после оптимизации:"
ls -lh public/blog/*.jpg