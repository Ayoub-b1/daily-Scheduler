import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import globalStyles from './../variables/style';
import Card from './../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../variables/colors';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation  }) {
    const { t, i18n } = useTranslation();
    const [voyages, setVoyages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [departureStation, setDepartureStation] = useState({});
    const [arrivalStation, setArrivalStation] = useState({});
    const [deplang, setDepLang] = useState('');
    const [arrLang, setArrLang] = useState('');
    const isFocused = useIsFocused();
    const styles = globalStyles();
    if (!styles) {
        // Handle font loading state, return a loading indicator if necessary
        return <Splash></Splash>;
      }

    
    useEffect(() => {
        getData();
    }, [isFocused]);

    const getCurrentDateFormatted = () => {
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);

        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');

        const offsetSign = offset > 0 ? '-' : '+';
        const offsetHours = String(Math.abs(Math.floor(offset / 60))).padStart(2, '0');
        const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, '0');
        const formattedOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`;
    };
    const getData = async () => {
        try {
          const depart = await AsyncStorage.getItem('departureStation');
          const arrival = await AsyncStorage.getItem('arrivalStation');
          const storedLanguage = await AsyncStorage.getItem('language');
          if (depart && arrival) {
            const departureS = JSON.parse(depart);
            const arrivalS = JSON.parse(arrival);
    
            setDepartureStation(departureS);
            setArrivalStation(arrivalS);
    
            switch (storedLanguage) {
              case 'es':
                setDepLang(departureS.designationEn);
                setArrLang(arrivalS.designationEn);
              case 'en':
                setDepLang(departureS.designationEn);
                setArrLang(arrivalS.designationEn);
                break;
              case 'fr':
                setDepLang(departureS.designationFr);
                setArrLang(arrivalS.designationFr);
                break;
              case 'ar':
                setDepLang(departureS.designationAr);
                setArrLang(arrivalS.designationAr);
                break;
              default:
                setDepLang(departureS.designationEn);
                setArrLang(arrivalS.designationEn);
                break;
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
    const fetchTrains = async () => {
        setIsLoading(true);
        const postData = {
            codeGareDepart: departureStation.codeGare,
            codeGareArrivee: arrivalStation.codeGare,
            codeNiveauConfort: 2,
            dateDepartAller: getCurrentDateFormatted(),
            dateDepartAllerMax: null,
            dateDepartRetour: null,
            dateDepartRetourMax: null,
            isTrainDirect: null,
            isPreviousTrainAller: null,
            isTarifReduit: true,
            adulte: 1,
            kids: 0,
            listVoyageur: [
                {
                    numeroClient: null,
                    codeTarif: null,
                    codeProfilDemographique: '3',
                    dateNaissance: null,
                },
            ],
            booking: false,
            isEntreprise: false,
            token: '',
            numeroContract: '',
            codeTiers: '',
        };
        try {
            const response = await axios.post('https://www.oncf-voyages.ma/api/availability', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            if (data.body && data.body.departurePath) {
                setVoyages(data.body.departurePath);
            } else {
                setVoyages([]);
            }
        } catch (e) {
            console.log(e);
            setVoyages([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (departureStation.codeGare && arrivalStation.codeGare) {
            fetchTrains();
        }
        
    }, [departureStation, arrivalStation, isFocused]);

    const extractHoursMin = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    const extracDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');

        return `${day}/${month}`;
    };


    const changepath = async () => {
        const depart = await AsyncStorage.getItem('departureStation');
        const arrival = await AsyncStorage.getItem('arrivalStation');

        if (depart && arrival) {
            await AsyncStorage.setItem('departureStation', arrival);
            await AsyncStorage.setItem('arrivalStation', depart);
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
    };

    const extracDuration = (timeString) => {
        if (!timeString) return '';
    
       
        const date = new Date();
    
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
    
        date.setHours(hours, minutes, seconds, 0);
    
        const extractedHours = String(date.getHours()).padStart(2, '0');
        const extractedMinutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${extractedHours}h ${extractedMinutes}min`;
    };

    return (
        <View style={[styles.container, styles.d_flex_up]}>
            <View style={[styles.d_flex_up]}>
                <Card>
                    <View style={[styles.flex_between]}>
                        <Text style={[styles.station]}>{deplang}</Text>
                        <TouchableOpacity onPress={changepath}>
                            <Ionicons name="shuffle-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={[styles.station]}>{arrLang}</Text>
                    </View>
                </Card>
            </View>
            <View style={{ width: '100%', flex: 1 }}>
                <ScrollView  style={[styles.scroll_viewfix]}>
                    {voyages && voyages.length > 0 ? (
                        voyages.map((voyage, index) => (
                            <Card key={index} delaytime={index * 300}>
                                <View style={[styles.flex_between]}>
                                    <View style={styles.left_side}>
                                        <View style={styles.siders}>
                                            <Text>{t('depart')}</Text>
                                            <Text style={styles.mini_header}>{extractHoursMin(voyage.dateTimeDepart)}</Text>
                                            <Text>{deplang}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                                            <Text>{extracDate(voyage.dateTimeDepart)}</Text>
                                            <Text>{extracDuration(voyage.durationTrajet)}</Text>
                                            <Ionicons name="time-outline" size={24} color={colors.purple} />
                                        </View>
                                        <View style={styles.siders}>
                                            <Text>{t('arrive')}</Text>
                                            <Text style={styles.mini_header}>{extractHoursMin(voyage.dateTimeArrivee)}</Text>
                                            <Text>{arrLang}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', alignItems: 'center', gap: 20 }}>
                                            <Ionicons name="train-sharp" size={24} color={colors.purple} />
                                            <Text>{voyage.listSegments[0].codeClassification === 'COV' ? 'TNR' : 'TL'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        ))
                    ) : isLoading ? (
                        <ActivityIndicator style={{ marginTop: 20 }} size="large" color={colors.purple} />
                    ) : (
                        <Card>
                            <View style={[styles.flex_center]}>
                                <Text style={[styles.station, { marginHorizontal: 20, marginVertical: 0, width: '80%' }]}>
                                    {t('No_train')}
                                </Text>
                            </View>
                        </Card>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}
