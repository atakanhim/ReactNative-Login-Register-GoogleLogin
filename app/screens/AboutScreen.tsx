import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
    About: undefined; // Diğer ekranlarınız için ek parametreler tanımlayabilirsiniz
    // Örneğin: Home: { userId: string };
  };
type AboutScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'About'
>;
type Props = {
    navigation: AboutScreenNavigationProp;
  };
const DetailsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Sayfa</Text>
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

export default DetailsScreen;
