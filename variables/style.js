import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "../variables/colors";
import Splash from "../components/Splash";

const globalStyles = () => {
  // Load your custom fonts
  const [fontsLoaded] = useFonts({
    'MyCustomFont-Regular': require('../assets/fonts/Ubuntu-Regular.ttf'),
    'MyCustomFont-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
  });

  // Return empty styles object if fonts are not loaded
  if (!fontsLoaded) {
    return <Splash></Splash>
  }

  // Once fonts are loaded, define your styles
  return StyleSheet.create({
    container: {
      backgroundColor: '#f4f3ff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.primary,
      fontFamily: 'MyCustomFont-Bold', 
    },
    mini_header: {
      // fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.primary,
      fontFamily: 'MyCustomFont-Bold', 
    },
    text_subheader:{
        fontSize: 15,
        marginBottom: 20,
        fontWeight: 'bold',
        color: colors.dark,
        fontFamily: 'MyCustomFont-Bold',
    },
    title:{
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.dark,
      fontFamily: 'MyCustomFont-Bold',
    },
    siders:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',  
    }
    ,
    left_side:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // width: '100%',
      paddingHorizontal: 50,
    },
    mb_0:{
      marginBottom: 0,
    },
    mb_10:{
      marginBottom: 10,
    },
    mb_20:{
      marginBottom: 20,
    },
    mb_30:{
      marginBottom: 30,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 10,
    },
    w_auto:{
      width: 'auto',
    },
    w_100:{
      width: '100%',
    },
    mt_3:{
      marginTop: 10,
    },
    flex_left:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    flex_right:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    }
    ,
    mx_4:{
      marginHorizontal: 'auto' ,
      width: '90%'
    },
    text_white: {
      fontSize: 16,
      color: colors.white,
      textTransform: 'uppercase',
      fontFamily: 'MyCustomFont-Bold', 
    },
    my_font_regular:{
      fontFamily: 'MyCustomFont-Regular', 
    },
    my_font_bold:{
      fontFamily: 'MyCustomFont-Bold', 
    },
    d_flex_up:{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    flex_between:{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: 40,
    },
    flex_center:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    station:{
      borderColor: colors.accent,
      width: '100%',
      textAlign: 'center',
      fontFamily: 'MyCustomFont-Regular',
      fontSize: 18,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      
    },
    text_secondary:{
        fontSize: 12,
        width: '50%',
        textAlign: 'center',
        marginHorizontal: 'auto',
        marginBottom: 20,
        color: colors.dark,
    },
    languageButton: {
        marginHorizontal: 20,
        marginVertical: 20,
        textAlign: 'center',
    },
    languageButtonText:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'MyCustomFont-Bold', 
        color: colors.accent,
        flex : 1,
        paddingVertical: 10,
    },
    selectedLanguage:{
        color: colors.dark,
        fontSize: 17,
    },
    mt_350:{
        marginTop: 200,
    },
    languageContainer:{
        width:'100%',
        flexGrow: 0,
        flexShrink: 1,
    },
    d_flex_center:{
      flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_viewfix:{
      flexGrow:1,
      flexShrink:0,
      width: '100%',
      height: '20%',
    },
    btn_disabled:{
        backgroundColor: colors.accent, 
        elevation: 0,
        opacity: 0.7
    }
  });
};

export default globalStyles;
