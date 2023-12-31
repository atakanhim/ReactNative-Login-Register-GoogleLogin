import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

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
  const { onLogin,onRegister} = useAuth();

  const handleLogin = async () => {
    console.log("step 1");
    const result = await onLogin!(email,password);
    console.log("login screen : ",result );
  };
  const handleCreateUser = () => {

  }
  const handleGoogleLogin = () => {

  }
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
      <Button title="Kullanıcı Oluştur" onPress={handleCreateUser} />
      <Button
        title="Google ile Giriş Yap"
        onPress={handleGoogleLogin}
       
      />
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
