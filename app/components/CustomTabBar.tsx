import React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 60 }}>
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
          <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1 }}>
            <Text style={{ color: isFocused ? 'purple' : 'black' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

  
  );
};

const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    // İkon ve metin için ek stil tanımlamaları...
  });
export default CustomTabBar;
