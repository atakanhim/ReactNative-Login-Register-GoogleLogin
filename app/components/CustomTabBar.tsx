import React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label:any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
          style={isFocused ? styles.tabItemFocused : styles.tabItem}
          onPress={onPress}
          key={route.key}
        >
           <Text style={isFocused ? styles.textFocused : styles.text}>
            {label}
          </Text>
          </TouchableOpacity>
        );
      })}
    </View>

  
  );
};

const styles = StyleSheet.create({
  // Tab Bar Container
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    // Diğer stil özellikleri...
  },
  // Normal Tab
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Diğer stil özellikleri...
  },
  // Aktif Tab
  tabItemFocused: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0d7ff', // Örnek bir arka plan rengi
    borderRadius: 30, // Yuvarlak köşeler için
    margin: 5, // Etrafındaki boşluk için
    // Diğer stil özellikleri...
  },
  // Aktif Tab Alt Çizgisi
  activeTabHighlight: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'purple',
    bottom: 0,
    // Çizginin boyutunu ve konumunu ayarlayın...
  },
  // İkon ve Metin
  icon: {
    // İkon için stil özellikleri...
  },
  iconFocused: {
    // Aktif ikon için stil özellikleri...
  },
  text: {
    // Metin için stil özellikleri...
  },
  textFocused: {
    fontWeight: 'bold',
    // Aktif metin için diğer stil özellikleri...
  },
});


export default CustomTabBar;
