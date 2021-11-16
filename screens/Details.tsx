import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/components';

export const Details = ({ navigation }) => {
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.baseButton}
      >
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
