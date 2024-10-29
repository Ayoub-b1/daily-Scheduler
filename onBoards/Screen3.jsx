  import React, { useState } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
  import globalStyles from '../variables/style';
  import Splash from '../components/Splash';
  import { useTranslation } from 'react-i18next';
  import CircularImage from '../components/Circular';
  import Card from '../components/Card';
  import StepIndicator from '../components/Steps';
  import StationPicker from '../components/StationPicker';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation } from '@react-navigation/native';
  const Onboarding3 = ({setHasSeenOnBoarding}) => {
    currentPosition = 3
    const [departureStation, setDepartureStation] = useState([null]);
    const [arrivalStation, setArrivalStation] = useState([null]);
    const { t } = useTranslation();
    const navigation = useNavigation(); // Access navigation object
    const styles = globalStyles(); // Apply global styles
    const navigate_next = async () => {
      if (departureStation !== null && arrivalStation !== null) {
        try {
          // Save stations to AsyncStorage
          await AsyncStorage.setItem('departureStation', JSON.stringify(departureStation));
          await AsyncStorage.setItem('arrivalStation', JSON.stringify(arrivalStation));
          // Set hasSeenOnboarding to true
          await AsyncStorage.setItem('hasSeenOnBoarding', 'true');
          setHasSeenOnBoarding(true);

        } catch (error) {
          console.error('Error setting/retrieving stations:', error);
        }
      }
    };


    if (!styles) {
      // Handle font loading state, return a loading indicator if necessary
      return <Splash></Splash>;
    }
    return (
      <View style={[styles.container, { width: '100%' }]}>
        <CircularImage source={(require('../assets/tgv-alboraq.jpg'))} />
        <View style={{ height: '80%', width: '100%' }}>
          <ScrollView style={[styles.scroll_viewfix, styles.mt_350]}>
            <Card delaytime={0}>
              <Text style={[styles.title, styles.mb_0]} >{t('chose_depart')}</Text>
              <StationPicker  onSelectedStation={(station) => setDepartureStation(station)} ></StationPicker>
            </Card>
            <Card delaytime={900}>
              <Text style={styles.title} >{t('chose_arrive')}</Text>
              <StationPicker onSelectedStation={(station) => setArrivalStation(station)}></StationPicker>
            </Card>

            <TouchableOpacity style={[styles.button, { width: 'auto', paddingHorizontal: 30, margin: 20 }, (departureStation === null || arrivalStation === null) && styles.btn_disabled]} onPress={() => navigate_next()}>
              <Text style={[styles.text_white, { textAlign: 'center' }]}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <StepIndicator currentPosition={currentPosition} />
      </View>
    );
  };

  export default Onboarding3;
