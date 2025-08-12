import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
  });
  
  const router = useRouter();
  const pathname = usePathname();

  const resetAuthState = useCallback(() => {
    setAuthState({
      user: null,
      accessToken: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  // Логаут (объявляем первым)
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      resetAuthState();
      if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [router, pathname, resetAuthState]);

  // Обновление токена
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        // Получаем данные пользователя
        const userResponse = await fetch('/api/auth/me', { credentials: 'include' });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setAuthState({
            user: userData.user,
            accessToken: null,
            isLoading: false,
            isAuthenticated: true,
          });
        }
      } else {
        // Не удалось обновить токен — сбрасываем состояние без редиректа (редиректом заведует admin layout)
        resetAuthState();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      resetAuthState();
    }
  }, [resetAuthState]);

  // Логин
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        
        setAuthState({
          user: responseData.user,
          accessToken: null,
          isLoading: false,
          isAuthenticated: true,
        });

        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  }, []);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Проверяем авторизацию через cookie-based сессию
        const response = await fetch('/api/auth/me', { credentials: 'include' });

        if (response.ok) {
          const data = await response.json();
          setAuthState({
            user: data.user,
            accessToken: null,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          // Токен недействителен, пробуем обновить
          await refreshToken();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, [refreshToken]);

  // Проверка роли
  const hasRole = useCallback((roles: string[]) => {
    return authState.user ? roles.includes(authState.user.role) : false;
  }, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    refreshToken,
    hasRole,
  };
} 