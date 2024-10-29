import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { initI18n } from '../variables/i18n'; // Adjust the path as necessary
import Splash from '../components/Splash';

function I18nInitializer({ children }) {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      setI18nInitialized(true);
    });
  }, []);

  if (!i18nInitialized) {
    return <Splash />;
  }

  return children;
}
export default I18nInitializer;