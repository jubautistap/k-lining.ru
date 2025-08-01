// Основные типы для проекта KliningPro

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  popular?: boolean;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  description: string;
}

export interface AmoCRMConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export interface FooterLink {
  title: string;
  links: {
    name: string;
  href: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
  createdAt: string;
}

export interface PriceItem {
  id: string;
  service: string;
  type: 'apartment' | 'house' | 'office';
  area: string;
  price: number;
  duration: string;
  description: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

// API Response типы
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AmoCRMLeadResponse {
  success: boolean;
  leadId: string;
  message: string;
}

// Form типы
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  address: string;
  area: number;
  date: string;
  time: string;
  message?: string;
}

// Utility типы
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce';

// Component Props типы
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Event типы
export interface FormSubmitEvent {
  preventDefault: () => void;
  target: HTMLFormElement;
}

export interface InputChangeEvent {
  target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
}

// Configuration типы
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    sans: string[];
    serif: string[];
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
} 