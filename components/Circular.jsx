import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../variables/colors';

const CircularImage = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '110%',  // Adjust size as needed
    height: '30%', // Adjust size as needed
    borderBottomRightRadius: 60, // Half of the width and height for a circle
    overflow: 'hidden', // Clip the content to the borderRadius
    position: 'absolute', // Position the circle absolutely
    top: 0, // Adjust positioning from top
    right: 0, // Adjust positioning from left
    backgroundColor: '#ccc',
    borderBlockColor: colors.primary ,
    borderColor: colors.primary ,
    borderWidth: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire circle
  },
});

export default CircularImage;
