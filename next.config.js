/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k-lining.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Добавляем поддержку локальных изображений
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Безопаснее не позволять любые внешние SVG как изображения
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Только для SVG изображений
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  webpack: (config, { dev, isServer }) => {
    // Оптимизация для production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    // Поддержка импорта SVG как React-компонентов
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=()'
          },
          // Не кэшируем HTML по умолчанию (управляем кэшем точечно ниже)
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Кэшируем изображения/ассеты агрессивно
        source: '/:path*.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        // Явно отключаем кэширование для HTML
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // SEO: high-priority Russian slugs → existing pages
      { source: '/klining-moskva', destination: '/', permanent: true },
      { source: '/kliningovaya-kompaniya-moskva', destination: '/', permanent: true },
      { source: '/kliningovye-uslugi-moskva', destination: '/services', permanent: true },
      { source: '/poslestroitelnyy-klining-moskva', destination: '/services/post-renovation-cleaning', permanent: true },
      { source: '/vysotnyy-klining-moskva', destination: '/services/window-cleaning', permanent: true },
      { source: '/klining-prays-moskva', destination: '/prices', permanent: true },
      { source: '/kliningovaya-kompaniya-moskva-centr', destination: '/services', permanent: true },
      { source: '/klining-moskva-cao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-sao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-svao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-vao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-yuvao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-yuao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-yuzao', destination: '/districts', permanent: true },
      { source: '/klining-moskva-zao', destination: '/districts', permanent: true },

      // Pricing & calculator
      { source: '/klining-cena-moskva', destination: '/prices', permanent: true },
      { source: '/klining-stoimost-moskva', destination: '/prices', permanent: true },
      { source: '/uborka-kvartiry-cena-moskva', destination: '/prices', permanent: true },
      { source: '/uborka-ofisov-cena-moskva', destination: '/prices', permanent: true },
      { source: '/moyka-okon-cena-moskva', destination: '/prices', permanent: true },
      { source: '/uborka-cena-za-chas-moskva', destination: '/prices', permanent: true },
      { source: '/uborka-stoimost-za-m2-moskva', destination: '/prices', permanent: true },
      { source: '/besplatnyy-vyezd-ocenschika-moskva', destination: '/contacts', permanent: true },
      { source: '/raschet-stoimosti-uborki-moskva', destination: '/calculator', permanent: true },

      // Core services
      // Новые посадочные — убираем редиректы, страницы существуют
      // { source: '/uborka-kvartiry-moskva', destination: '/services/apartment-cleaning', permanent: true },
      // { source: '/uborka-posle-remonta-moskva', destination: '/services/post-renovation-cleaning', permanent: true },
      // { source: '/myte-okon-moskva', destination: '/services/window-cleaning', permanent: true },
      // { source: '/himchistka-mebeli-moskva', destination: '/services/furniture-dry-cleaning', permanent: true },
      // { source: '/uborka-ofisa-moskva', destination: '/services/office-cleaning', permanent: true },
    ];
  },
};

module.exports = nextConfig; 