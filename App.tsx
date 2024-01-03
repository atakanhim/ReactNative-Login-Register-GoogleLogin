import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons'; 
import { AuthProvider, useAuth } from './app/contexts/AuthContext';
import HomeScreen from './app/screens/HomeScreen';

import DetailsScreen from './app/screens/DetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './app/components/CustomTabBar';
import AboutScreen from './app/screens/AboutScreen';
import CreateUserScreen from './app/screens/CreateUserScreen';
import LoginScreen from './app/screens/LoginScreen';
// ... diğer ekranlarınız için importlar

const AuthStack = createNativeStackNavigator();
const AppTab = createBottomTabNavigator();

const AuthStackScreen = () => ( // loginscreende props gönderemeye çaklışrıken tiğpini degiştirdigim icin hat alıyorum
  <AuthStack.Navigator>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} /> 
     <AuthStack.Screen name="CreateUser" component={CreateUserScreen} />
    {/* Buraya diğer kimlik doğrulama ekranlarınızı ekleyebilirsiniz */}
  </AuthStack.Navigator>
);

const AppStackScreen = () => (
  <AppTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <AppTab.Screen  name="Home" 
         component={HomeScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }} />

    <AppTab.Screen name="Details" component={DetailsScreen} />
    <AppTab.Screen name="About" component={AboutScreen} />
    {/* Buraya uygulamanın diğer ana ekranlarını ekleyebilirsiniz */}
  </AppTab.Navigator>
);
const RootNavigator: React.FC = () => {
  const { authState } = useAuth();

  return authState?.authenticated ? <AppStackScreen /> : <AuthStackScreen />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};


export default App;
