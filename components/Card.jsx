import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, LayoutAnimation } from 'react-native';

const Card = ({ children  , delaytime}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardHeight = useRef(new Animated.Value(0)).current;
  const [isPageLoaded, setPageLoaded] = useState(false); // State to track page load

  useEffect(() => {
    // Simulate a delay for the animation when the component mounts
    setTimeout(() => {
      setIsOpen(true); // Trigger opening animation after delay
    }, 500); // Adjust delay time as needed

    // Animate to expanded height based on content after initial mount
    Animated.timing(cardHeight, {
      toValue: 250, // Any non-zero value to trigger the animation
      duration: 700,
      delay: delaytime,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPageLoaded(true); // Set page loaded once initial animation completes
    });

    // Cleanup function
    return () => {
      setIsOpen(false); // Reset isOpen state when component unmounts
    };
  }, []);

  return (
    <Animated.View style={[styles.card, { minHeight: cardHeight }]}>
      {isPageLoaded && ( // Render content only after page has loaded
        <>
          <View style={styles.leftp}></View>
          {children}
          <View style={styles.rightp}></View>
        </>
      )}
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginHorizontal:'auto',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  leftp: {
    width: 30,
    height: 30,
    backgroundColor: '#f4f3ff',
    borderRadius: 15,
    position: 'absolute',
    left: 0,
    marginLeft: -15,
    top: '50%',
    marginTop: -15,
  },
  rightp: {
    width: 30,
    height: 30,
    backgroundColor: '#f4f3ff',
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    marginRight: -15,
    top: '50%',
    marginTop: -15,
  },
});
