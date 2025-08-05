import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

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
      localStorage.removeItem('accessToken');
      setAuthState({
        user: null,
        accessToken: null,
        isLoading: false,
        isAuthenticated: false,
      });
      router.push('/admin/login');
    }
  }, [router]);

  // Обновление токена
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        
        // Получаем данные пользователя
        const userResponse = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${data.accessToken}` }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setAuthState({
            user: userData.user,
            accessToken: data.accessToken,
            isLoading: false,
            isAuthenticated: true,
          });
        }
      } else {
        // Не удалось обновить токен
        logout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
    }
  }, [logout]);

  // Логин
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('accessToken', responseData.accessToken);
        
        setAuthState({
          user: responseData.user,
          accessToken: responseData.accessToken,
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
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }

        // Проверяем токен через API
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setAuthState({
            user: data.user,
            accessToken: token,
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