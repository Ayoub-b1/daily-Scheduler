import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../variables/colors';

const StepIndicator = ({ currentPosition }) => {
  const totalSteps = 3; // Total number of steps
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1); // Array of steps [1, 2, 3]

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {steps.map((step) => (
          <View
            key={step}
            style={[
              styles.step,
              step === currentPosition ? styles.currentStep : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent', // Ensure the background is transparent to overlay on other content
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  step: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  currentStep: {
    backgroundColor: colors.primary, // Change color for current step
  },
});

export default StepIndicator;
