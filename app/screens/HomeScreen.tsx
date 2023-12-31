import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

type AuthStackParamList = {
    Home: undefined; // Diğer ekranlarınız için ek parametreler tanımlayabilirsiniz
    // Örneğin: Home: { userId: string };
  };
type HomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Home'
>;
type Props = {
    navigation: HomeScreenNavigationProp;
  };



const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { onLogout} = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => logoutFunction()}
          title="Çıkış Yap"
          color="#000" // Burada istediğiniz renk kodunu kullanabilirsiniz.
        />
      ),
    });
  }, [navigation]);
  const logoutFunction = async () => {
    // Çıkış yapma işlemlerinizi burada gerçekleştirin.
    console.log('Çıkış yapılıyor...');
    await onLogout!();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Sayf a a</Text>
      {/* İçerik ve diğer bileşenler burada yer alabilir */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default HomeScreen;
