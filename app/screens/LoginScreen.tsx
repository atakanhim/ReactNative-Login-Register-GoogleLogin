import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin"

type AuthStackParamList = {
    Login: undefined; // Diğer ekranlarınız için ek parametreler tanımlayabilirsiniz
    // Örneğin: Home: { userId: string };
  };
type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;
type Props = {
    navigation: LoginScreenNavigationProp;
  };


const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin,onRegister,onGoogleLogin} = useAuth();

  const [error,setError]:any = useState();
  const [userInfo,setUserInfo]:any = useState();

  useEffect(()=> { 
    GoogleSignin.configure({
      webClientId:"755504417580-g7q8ih9taiqrt6t0j8bht56aj2tlehhb.apps.googleusercontent.com"
    });
  },[]);


  const handleLogin = async () => {
    console.log("step 1");
    const result = await onLogin!(email,password);
    console.log("login screen : ",result );
  };
  const handleCreateUser = () => {

  }

  const handleGoogleLogin = async () => {
      try{
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
  
        const result = await onGoogleLogin!(user.idToken);
        console.log("googlelogin screen : ",result );
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
  

      <View>
        <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={handleGoogleLogin}></GoogleSigninButton>
        <TextInput>{JSON.stringify(error)}</TextInput>
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
