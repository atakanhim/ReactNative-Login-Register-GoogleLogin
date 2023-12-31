import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { accessToken: string | null; refreshToken: string | null;authenticated: boolean | null };
  onRegister?: (nameSurname: string, userName: string,email: string, password: string,passwordConfirm: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://d567-31-223-52-203.ngrok-free.app' ;
const AuthContext = createContext<AuthProps>({});

// AuthProvider bileşeni ile context için bir value sağlıyoruz ve çocuk bileşenleri sarmalıyoruz
export const AuthProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [authState, setAuthState] = useState<{ accessToken: string | null; refreshToken: string | null;authenticated: boolean | null }>({
    accessToken: null,
    refreshToken:null,
    authenticated: null
  });

  useEffect(() => {
    // Uygulama başladığında token kontrolü yapılıyor
    const bootstrapAsync = async () => {
      let accToken: string | null = null;
      let refToken: string | null = null;
      try {
        // Token secure store'dan alınıyor
        accToken = await SecureStore.getItemAsync(TOKEN_KEY);
      } catch (e) { 
        // Hata durumunda işlemler...
      }

      // AuthState güncelleniyor
      setAuthState({ accessToken: accToken,refreshToken:refToken, authenticated: accToken ? true : false });

  
    };

    bootstrapAsync();
  }, []);

  const onRegister = async (nameSurname: string, userName: string,email: string, password: string,passwordConfirm: string) => {
    try {
      return await axios.post(`${API_URL}/user/create`, { nameSurname,userName,email, password,passwordConfirm });      
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }

  };

  const onLogin = async (email: string, password: string) => {
    try {

      const result = await axios.post(`${API_URL}/api/Auth/Login`, {
        usernameOrEmail: email, // Kullanıcının gerçek adı veya e-posta adresi buraya
        password: password // Gerçek şifre buraya
      });

      console.log("result:", result.data);
      setAuthState({
        accessToken: result.data.token.accessToken,
        refreshToken:result.data.token.refreshToken,
        authenticated: true
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token.accessToken}`

      await SecureStore.setItemAsync(TOKEN_KEY,result.data.token.accessToken)
      console.log(authState);

      return result;
    } catch (e) {
      console.log(e);
    }
  };
  

  const onLogout = async () => {
    // Kullanıcı çıkış işlemleri...
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = "";
    setAuthState({
      accessToken: null,
      refreshToken:null,
      authenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useAuth = () => useContext(AuthContext);

