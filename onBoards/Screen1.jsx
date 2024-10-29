import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import globalStyles from '../variables/style'; // Adjust the import path if necessary
import { colors } from '../variables/colors';
import Splash from '../components/Splash';
import StepIndicator from '../components/Steps';

const Onboarding1 = ({ navigation }) => {
  const currentPage = 1; 
  const styles = globalStyles(); // Apply global styles

  if (!styles) {
    // Handle font loading state, return a loading indicator if necessary
    return <Splash></Splash>;
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.header}>Daily Scheduler</Text>
        <Text style={styles.text_secondary}>Explore the app that makes you Never miss a train</Text>
        
      <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.text_white}>Start</Text>
      </TouchableOpacity>
      <StepIndicator currentPosition={currentPage} />
    </View>
  );
};

export default Onboarding1;
