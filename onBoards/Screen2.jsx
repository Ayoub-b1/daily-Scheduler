import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import globalStyles from '../variables/style'; // Adjust the import path if necessary
import { colors } from '../variables/colors';
import Splash from '../components/Splash';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; 
import StepIndicator from '../components/Steps';

const Onboarding2 = ({ navigation }) => {
  const currentPage = 2; 
  const styles = globalStyles(); // Apply global styles
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
 
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  
    const handleLanguageSelect = async (language) => {
      setSelectedLanguage(language);
      try {
        await AsyncStorage.setItem('language', language);
        const storedLanguage = await AsyncStorage.getItem('language');
        changeLanguage(language)
      } catch (error) {
        console.error('Error setting/retrieving language:', error);
      }
    };

  
  const navigate_next = (navigation) => {
    if (selectedLanguage === null) {
      alert('Please select a language')
      disabled = true;
    } else {
      navigation.navigate('Onboarding3')
    }
  }

  if (!styles) {
    // Handle font loading state, return a loading indicator if necessary
    return <Splash></Splash>;
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.header}>Daily Scheduler</Text>
      <Text style={styles.text_subheader}>choose a language to start</Text>
      <ScrollView style={styles.languageContainer}>
        <TouchableOpacity
          style={[styles.languageButton]}
          onPress={() => handleLanguageSelect('en')}
        >

          <Text style={[styles.languageButtonText, selectedLanguage === 'en' && styles.selectedLanguage]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect('es')}
        >
          <Text style={[styles.languageButtonText, selectedLanguage === 'es' && styles.selectedLanguage]}>Spanish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect('fr')}
        >
          <Text style={[styles.languageButtonText, selectedLanguage === 'fr' && styles.selectedLanguage]}>French</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect('ar')}
        >
          <Text style={[styles.languageButtonText, selectedLanguage === 'ar' && styles.selectedLanguage]}>العربية</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={[styles.button , selectedLanguage === null && styles.btn_disabled ]} onPress={() => navigate_next(navigation)}>
        <Text style={styles.text_white}>Next</Text>
      </TouchableOpacity>
      <StepIndicator currentPosition={currentPage} />
    </View>
  );
};

export default Onboarding2;
