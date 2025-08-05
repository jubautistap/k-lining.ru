import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
}

export default function rateLimit(options: RateLimitOptions = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        tokenCache.set(token, tokenCount);

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'));
        } else {
          resolve();
        }
      }),
  };
}

// Создаем экземпляры для разных эндпоинтов
export const authRateLimit = rateLimit({
  interval: 15 * 60 * 1000, // 15 минут
  uniqueTokenPerInterval: 500,
});

export const apiRateLimit = rateLimit({
  interval: 60 * 1000, // 1 минута
  uniqueTokenPerInterval: 1000,
}); 