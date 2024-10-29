import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnimatedTabIcon = ({ route, focused, color, size }) => {
  const paddingAnim = useRef(new Animated.Value(0)).current;
  
  let iconName;
  
  if (route.name === 'Home') {
    iconName = focused ? 'train' : 'train-outline';
  } else if (route.name === 'settings') {
    iconName = focused ? 'trail-sign' : 'trail-sign-outline';
  }
  
  const tabBarStyle = {
    backgroundColor: focused ? 'rgba(0,0,0,0.1)' : 'transparent',
    borderRadius: 50,
    wind: paddingAnim,
    paddingVertical: 3,
  };
  
    useEffect(() => {
      Animated.timing(paddingAnim, {
        toValue: focused ? 25 : 0,
        easing: Easing.linear,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, [focused]);

  return (
    <Animated.View style={tabBarStyle}>
      <Ionicons name={iconName} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedTabIcon;
