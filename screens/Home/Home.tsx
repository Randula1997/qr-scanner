/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScannerHome')}>
          <Text style={styles.buttonText}>Scan Machines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.buttonText}>Production Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.buttonText}>Scan Vehicles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
