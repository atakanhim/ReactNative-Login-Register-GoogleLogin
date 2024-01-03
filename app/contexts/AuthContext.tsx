import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface AuthProps {
  authState?: { accessToken: string | null; refreshToken: string | null;authenticated: boolean | null };
  onRegister?: (nameSurname: string, userName: string,email: string, password: string,passwordConfirm: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onGoogleLogin?: (idToken: string | null) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://194c-31-223-56-58.ngrok-free.app/api';
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
      const result =  await axios.post(`${API_URL}/users/create`, { nameSurname,userName,email, password,passwordConfirm });    
      return result.data;
    } catch (e) {
      console.log(e);
    }

  };

  const onLogin = async (email: string, password: string) => {
    try {

      const result = await axios.post(`${API_URL}/Auth/Login`, {
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
      return result;
    } catch (e) {
      console.log(e);
    }
  };
  const onGoogleLogin = async (idToken: string | null) => {
    try {

      const result = await axios.post(`${API_URL}/Auth/google-login`, {
        idToken: idToken, // Kullanıcının gerçek adı veya e-posta adresi buraya
      });
      console.log("result:", result.data);

      setAuthState({
        accessToken: result.data.token.accessToken,
        refreshToken:result.data.token.refreshToken,
        authenticated: true
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token.accessToken}`
      await SecureStore.setItemAsync(TOKEN_KEY,result.data.token.accessToken)

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


    //google ile girdiyse -
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn){
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
   
  };

  return (
    <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout,onGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useAuth = () => useContext(AuthContext);

