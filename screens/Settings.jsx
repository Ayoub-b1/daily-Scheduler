import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react-native';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import globalStyles from '../variables/style';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { colors } from '../variables/colors';
import LangPicker from '../components/LangPicker'
import StationPicker from './../components/StationPickerSetting';


export default function Settings({ setHasSeenOnBoarding }) {
    const { t, i18n } = useTranslation();
    const [departureStation, setDepartureStation] = useState(null);
    const [arrivalStation, setArrivalStation] = useState(null);
    const [styledet , setStyleDet] = useState(false);
    const [langchange , setLangchange] = useState(false);
    const isForcused = useIsFocused();
    
    const styles = globalStyles()
    const navigation = useNavigation();
    
    const gg = () => {
        const del = async ()=>{
            await AsyncStorage.clear()
            setHasSeenOnBoarding(false)
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
       React.Alert.alert(
            t('deletion'),
            '',
            
            [
                {
                    text: t('cancel'),
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: t('yes'),
                    onPress: () => {del()},
                },
            ])

    }
    const getLang = async () => {
        try {
            const lang = await AsyncStorage.getItem('language');
            if(lang !== null && lang == 'ar'){
                setStyleDet(true)
                
            }else{
                setStyleDet(false)
            }
           
        }
        catch (error) {
            console.error('Error retrieving stations:', error);
        }
        
    }
    useEffect(()=>{
        getLang()
    },[isForcused])
    const submitStations = async () => {
        if (departureStation !== null && arrivalStation !== null) {
            try {
                // Save stations to AsyncStorage
                await AsyncStorage.setItem('departureStation', JSON.stringify(departureStation));
                await AsyncStorage.setItem('arrivalStation', JSON.stringify(arrivalStation));
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] })


            } catch (error) {
                console.error('Error setting/retrieving stations:', error);
            }
        }else{
            alert('Please select a language')
            disabled = true
        }
    };

    const onSelectedLang = async (lang) => {
        try {
            await AsyncStorage.setItem('language', lang);
            i18n.changeLanguage(lang);
            getLang()
        } catch (error) {
            console.error('Error setting language:', error);
        }
    }
    return (
        <View style={[styles.container, styles.d_flex_up, styledet? styles.flex_right : styles.flex_left]}>
            <ScrollView style={{ width: '100%' }}>

                <View style={[styles.d_flex_up, styles.w_100, { flex: 1 },styledet? styles.flex_right : styles.flex_left, styles.mx_4, styles.mt_3]}>
                    <View style={[styles.w_100, { flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' } , styledet? styles.flex_right : styles.flex_left]}>
                        <Text style={styles.header}>{t('changeStation')} </Text>
                        <Text style={[styles.title, styles.mb_0]} >{t('chose_depart')}</Text>

                        <StationPicker onSelectedStation={(station) => setDepartureStation(station)} ></StationPicker>

                        <Text style={styles.title} >{t('chose_arrive')}</Text>
                        <StationPicker onSelectedStation={(station) => setArrivalStation(station)}></StationPicker>

                        <TouchableOpacity style={[styles.button, { width: 'auto', paddingHorizontal: 30 , marginBottom: 20}, (departureStation === null || arrivalStation === null) && styles.btn_disabled]} onPress={() => submitStations()}>
                            <Text style={[styles.text_white, { textAlign: 'center' }]}>{t('Change')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.w_100, styles.d_flex_up, styledet? styles.flex_right : styles.flex_left]}>
                        <Text style={[styles.header , {marginBottom:10}]}>{t('language')} </Text>
                        <LangPicker onSelectedLang={onSelectedLang}></LangPicker>
                    </View>
                    <View style={[styles.w_100, styles.d_flex_up, styledet? styles.flex_right : styles.flex_left , {marginBottom: 40}]}>
                        <Text style={styles.header}>{t('delete')} </Text>
                        <TouchableOpacity style={[styles.button, styles.w_auto]} onPress={() => gg()}>
                            <Text style={styles.text_white}>{t('del')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}