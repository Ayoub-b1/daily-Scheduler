import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { colors } from '../variables/colors';

const StationPicker = ({ onSelectedStation }) => {
    const [stations, setStations] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get('https://www.oncf-voyages.ma/api/stations');
                
                setStations(response.data.station);
            } catch (error) {
                console.error('Error fetching stations:', error);

            }
        };

        fetchStations()
    }, []);

    const handleValueChange = (itemValue) => {
        if (itemValue === '') return; // If placeholder is selected, do nothing
        const selectedStation = stations.find(station => station.codeGare === itemValue);
        const stationDetail = {
            codeGare: selectedStation.codeGare,
            designationEn: selectedStation.designationEn,
            designationFr: selectedStation.designationFr,
            designationAr: selectedStation.designationAr,
        };
        setSelectedValue(itemValue);
        onSelectedStation(stationDetail);
    };

    return (
        <View style={styles.container}>
            <View style={styles.holder}>
                <Text style={styles.label}>{t('station')}</Text>
                <View style={styles.bor}></View>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleValueChange(itemValue)}
                    mode="dropdown"
                    itemStyle={{ fontSize: 18, height: 30 }}
                >
                    <Picker.Item label={stations.length === 0 ? t('loading') : t('Select_station')} value="" color={colors.gray} />
                    {stations.map((station) => {
                        if (Number(station.codeGare)) {
                            return <Picker.Item
                                key={station.codeGare}
                                label={station.designationEn}
                                value={station.codeGare}
                            />
                        }
                    }
                    )}
                </Picker>
            </View>
            {selectedValue ? (
                <Text style={styles.selected}>{t('selected')} : {stations.find(station => station.codeGare === selectedValue)?.designationEn}</Text>
            ) : (
                <Text style={styles.selected}></Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    label: {
        fontSize: 15,
        paddingLeft: 10,
    },
    bor: {
        borderLeftColor: '#000',
        borderLeftWidth: 0.4,
        height: 30,
    },
    picker: {
        fontSize: 18,
        height: 30,
        width: '60%',
        borderLeftColor: '#000',
        borderLeftWidth: 0.4,
    },
    selected: {
        marginTop: 20,
        fontSize: 18,
        color: colors.accent,
        fontWeight: 'bold',
    },
    holder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderWidth: 0.4,
        borderColor: '#000',
        borderRadius: 10,
    },
});

export default StationPicker;
