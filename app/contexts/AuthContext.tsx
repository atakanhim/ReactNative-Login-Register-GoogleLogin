import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

// AuthProvider bileşeni ile context için bir value sağlıyoruz ve çocuk bileşenleri sarmalıyoruz
export const AuthProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
    token: null,
    authenticated: null
  });

  useEffect(() => {
    // Uygulama başladığında token kontrolü yapılıyor
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        // Token secure store'dan alınıyor
        userToken = await SecureStore.getItemAsync(TOKEN_KEY);
      } catch (e) { 
        // Hata durumunda işlemler...
      }

      // AuthState güncelleniyor
      setAuthState({ token: userToken, authenticated: userToken ? true : false });
    };

    bootstrapAsync();
  }, []);

  const onRegister = async (email: string, password: string) => {
    // Kullanıcı kayıt işlemleri...
  };

  const onLogin = async (email: string, password: string) => {
    // Kullanıcı giriş işlemleri...
  };

  const onLogout = async () => {
    // Kullanıcı çıkış işlemleri...
  };

  return (
    <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useAuth = () => useContext(AuthContext);

