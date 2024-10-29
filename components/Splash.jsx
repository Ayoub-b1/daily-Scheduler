import * as React from 'react-native';
import {  ImageBackground } from 'react-native';

export default function Splash() {
    

    return(
        <React.View>
            <ImageBackground source={require('../assets/splash.jpg')} style={{width: '100%', height: '100%'}}></ImageBackground>
        </React.View>
    )
}