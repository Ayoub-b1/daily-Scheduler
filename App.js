
import { StyleSheet, Text, View, Easing, Animated } from 'react-native';
import Onboarding1 from './onBoards/Screen1';
import Onboarding2 from './onBoards/Screen2';
import Onboarding3 from './onBoards/Screen3';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Settings from './screens/Settings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import i18n from './variables/i18n';
import { useTranslation } from 'react-i18next';
import Splash from './components/Splash';
import { colors } from './variables/colors';
import globalStyles from './variables/style';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  const { t, i18n } = useTranslation();
  const styles = globalStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnBoarding, setHasSeenOnBoarding] = useState(false);
  const [paddingAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const checkonboarding = async () => {
      const hasseen = await AsyncStorage.getItem('hasSeenOnBoarding');

      if (hasseen == 'true') {

        setHasSeenOnBoarding(true);
      }
      setIsLoading(false);
    };

    checkonboarding();
  }, []);
  
  const animatePadding = (tovalue) => {
    Animated.timing(paddingAnim, {

      toValue: 25,
      easing: Easing.linear,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }

  if (isLoading) {
    return <Splash></Splash>
  }

  return (
    <NavigationContainer>
      {hasSeenOnBoarding == true ? (<Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'train' : 'train-outline'
          } else if (route.name === 'settings') {
            iconName = focused ? 'trail-sign' : 'trail-sign-outline'
          }

          const tabBarStyle = focused
            ? {
              backgroundColor: colors.background,
              elevation: -4,


              borderRadius: 50,
              paddingHorizontal: paddingAnim,
              paddingVertical: 3,



            }
            : {
              paddingHorizontal: 0,
              paddingVertical: 0,
            };

          if (focused) {
            animatePadding(25);
          } else {
            animatePadding(0);
          }

          return <Animated.View style={tabBarStyle}>
            <Ionicons name={iconName} size={size} color={color} />
          </Animated.View>;
        },
        tabBarActiveTintColor: '#fb5a4f',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: () => null,

      })}>
        <Tab.Screen options={{
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,


          },
          headerTitle: t('title'), // Set the title of the header
          headerTintColor: colors.primary, // Set the text color of the header
          headerTitleStyle: {
            fontSize: 18,
            ...styles.my_font_bold,
            textAlign: 'center',
            width: '100%'
          },
          headerTitleAlign: 'center',


        }} name="Home" >
          {(props) => <Home {...props} />}

        </Tab.Screen>
        <Tab.Screen options={{
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,


          },
          headerTitle: t('Settings'), // Set the title of the header
          headerTintColor: colors.primary, // Set the text color of the header
          headerTitleStyle: {
            fontSize: 18,
            ...styles.my_font_bold,
            textAlign: 'center',
            width: '100%'
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Ionicons name='settings-outline' size={25} color={colors.primary} style={{ marginLeft: 15 }} />
          )




        }} name="settings"  >
          {(props) => <Settings {...props}  setHasSeenOnBoarding={setHasSeenOnBoarding} />}
        </Tab.Screen>
      </Tab.Navigator>) : (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Onboarding1' component={Onboarding1} />
          <Stack.Screen name='Onboarding2' component={Onboarding2} />
          <Stack.Screen name="Onboarding3">
            {(props) => <Onboarding3 {...props} setHasSeenOnBoarding={setHasSeenOnBoarding} />}
          </Stack.Screen>
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
