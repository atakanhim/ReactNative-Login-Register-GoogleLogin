import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { Entypo } from '@expo/vector-icons'; 
import { AuthProvider, useAuth } from './app/contexts/AuthContext';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './app/components/CustomTabBar';
import AboutScreen from './app/screens/AboutScreen';
import CreateUserScreen from './app/screens/CreateUserScreen';
// ... diğer ekranlarınız için importlar

const AuthStack = createNativeStackNavigator();
const AppStack = createBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
     <AuthStack.Screen name="CreateUser" component={CreateUserScreen} />
    {/* Buraya diğer kimlik doğrulama ekranlarınızı ekleyebilirsiniz */}
  </AuthStack.Navigator>
);

const AppStackScreen = () => (
  <AppStack.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <AppStack.Screen  name="Home" 
         component={HomeScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }} />

    <AppStack.Screen name="Details" component={DetailsScreen} />
    <AppStack.Screen name="About" component={AboutScreen} />
    {/* Buraya uygulamanın diğer ana ekranlarını ekleyebilirsiniz */}
  </AppStack.Navigator>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const RootNavigator: React.FC = () => {
  const { authState } = useAuth();

  return authState?.authenticated ? <AppStackScreen /> : <AuthStackScreen />;
};

export default App;
