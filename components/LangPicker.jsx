import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { colors } from '../variables/colors';

const LangPicker = ({ onSelectedLang }) => {
    const [lang, setLang] = useState([
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'ar', label: 'العربية' },
        { code: 'es', label: 'Español' },
    ]);
    const [selectedValue, setSelectedValue] = useState('');
    const { t, i18n } = useTranslation();

    const handleValueChange = (itemValue) => {
        if (itemValue === '') return; // If placeholder is selected, do nothing
        const selectedLanguage = lang.find(language => language.code === itemValue);
        setSelectedValue(itemValue);
        onSelectedLang(itemValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.holder}>
                <Text style={styles.label}>{t('language')}</Text>
                <View style={styles.bor}></View>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleValueChange(itemValue)}
                    mode="dropdown"
                    itemStyle={{ fontSize: 18, height: 30 }} 
                >
                    <Picker.Item label={lang.length === 0 ? t('loading') : t('Select_lang')} value="" color={colors.gray} />
                    {lang.map((lg) => (
                        <Picker.Item
                            key={lg.code}
                            label={lg.label}
                            value={lg.code}
                        />
                    ))}
                </Picker>
            </View>
            {/* {selectedValue ? (
                <Text style={styles.selected}>Selected: {lang.find(language => language.code === selectedValue)?.label}</Text>
            ) : (
                <Text style={styles.selected}></Text>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 15,
        textAlign: 'center',
        width: '25%',
    },
    bor: {
        borderLeftColor: '#000',
        borderLeftWidth: 0.4,
        height: 30,
    },
    picker: {
        fontSize: 18,
        height: 30,
        width: '75%',
    },
    selected: {
        marginTop: 10,
        fontSize: 14,
        color: colors.accent,
        textAlign: 'left',
        width: '100%',
        fontWeight: 'bold',
    },
    holder: {
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.4,
        borderColor: '#000',
        borderRadius: 10,
    },
});

export default LangPicker;
