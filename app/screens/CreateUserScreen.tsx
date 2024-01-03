import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
    CreateUser: undefined; // Diğer ekranlarınız için ek parametreler tanımlayabilirsiniz
    LoginScreen: undefined;
    // Örneğin: Home: { userId: string };
  };
  
type Props = NativeStackScreenProps<AuthStackParamList, 'CreateUser'>;

  
const CreateUserScreen: React.FC<any> = ({ navigation ,route}) => {
  const [nameSurname, setNameSurname] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { onRegister} = useAuth();


  
  const handleCreate = async () => {
    const result = await onRegister!(nameSurname,userName,email,password,confirmPassword);
    console.log(result.message);// hatayi ekrana verme
    if(result.succeeded){
      navigation.navigate("LoginScreen",{message:"Kullanici ekleme islemi basarili"});
    }
  
  }
  return (
    <View style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={nameSurname}
        onChangeText={setNameSurname}
      /> 
      <TextInput
      style={styles.input}
      placeholder="Kullanici Adi"
      value={userName}
      onChangeText={setUserName}
    />
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
        
   
            <TextInput
        style={styles.input}
        placeholder="Şifre Tekrar"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <Button title="Üye Ol" onPress={handleCreate} />
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

export default CreateUserScreen;
