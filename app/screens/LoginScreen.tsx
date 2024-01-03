import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin"
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  LoginScreen: undefined; // 'message' adında opsiyonel bir parametre
  CreateUser: undefined;
  // Diğer ekranlar için parametreler
};
type Props = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;


const LoginScreen:React.FC<any> = ({ navigation,route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin,onRegister,onGoogleLogin} = useAuth();
  const [error,setError]:any = useState();
  const [userInfo,setUserInfo]:any = useState();



  const [message, setMessage] = useState('');

  useEffect(()=> { 
    GoogleSignin.configure({
      webClientId:"755504417580-g7q8ih9taiqrt6t0j8bht56aj2tlehhb.apps.googleusercontent.com"
    });
  },[]);

 useEffect(() => {
  if (route.params?.message) {
    setMessage(route.params.message);
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000); // 3 saniye sonra mesajı kaldır

    return () => clearTimeout(timer); // Eğer bileşen unmount olursa, zamanlayıcıyı temizle
  }
}, [route.params?.message]);



  const handleLogin = async () => {

    const result = await onLogin!(email,password);
  };
  const handleCreateUser = () => {
    navigation.navigate("CreateUser");
  }

  const handleGoogleLogin = async () => {
      try{
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
  
        const result = await onGoogleLogin!(user.idToken);

        if(result.Succeeded){
          console.log("googlelogin screen : ",result );
        }

        setUserInfo(user);
        console.log(user);
      }
      catch(e){
        setError(e);
      }

  }

    // const googleLogout = ()=> {
  //   setUserInfo();
  //   GoogleSignin.revokeAccess();
  //   GoogleSignin.signOut();
  // }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button title="Kullanici Oluştur" onPress={handleCreateUser} />
      {message && (
        <TextInput >{message}</TextInput>
      )}

      <View>
        <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={handleGoogleLogin}></GoogleSigninButton>
        <TextInput>{JSON.stringify(error?.message)}</TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  }
});

export default LoginScreen;
