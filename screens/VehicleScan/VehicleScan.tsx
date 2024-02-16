/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useRef } from 'react';
import {
  Text,
  View,
  Vibration,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

interface ScannedItem{
    VehicleNo: string ;
    Type: any;
}

const VehicleScan = React.memo(() => {
  const factoryCode = SyncStorage.get('factoryCode');

  const [scanned, setScanned] = useState(false);
  const [lastScannedNumber, setLastScannedNumber] = useState('');
  const [selectedButton, setSelectedButton] = useState('IN');
  const [loading, setLoading] = useState(false);
  const [flashLightOn, setFlashLightOn] = useState<'off' | 'on' | undefined>('off');
  const alertVisibleRef = useRef(false);
  const [scannedNumbers, setScannedNumbers] = useState<ScannedItem[]>([]);
  const device = useCameraDevice('back');

  const handleBarCodeScanned = async (scannedNo : any) => {
      Vibration.vibrate();
      setScanned(true);
      setLastScannedNumber(scannedNo);
      const payload = {
        Date: new Date().toISOString(),
        Location: factoryCode,
        Type: selectedButton,
        VehicleNo: scannedNo,
      };
      const apiUrl = 'http://124.43.17.223:8020/ITRACK/api/services/app/vehicleManagement/ScanVehicle';
      setLoading(true);
      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          Alert.alert('Vehicle Number Uploaded');
          setScannedNumbers((prev: any) => [...prev, { Type: selectedButton, VehicleNo: scannedNo }]);
        } else {
        }
      } catch (error) {
        Alert.alert('Something went wrong');
      }
    setLoading(false);
      setTimeout(() => {
        setScanned(false);
      }, 500);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (!scanned){
        handleBarCodeScanned(codes[0].value);
      }
    }
  });

  const toggleFlashLight = () => {
    setFlashLightOn((prev) => (prev === 'on' ? 'off' : 'on'));
  };

  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const countIn = scannedNumbers.filter((item) => item.Type === 'IN').length;
  const countOut = scannedNumbers.filter((item) => item.Type === 'OUT').length;

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>
        {scannedNumbers.length.toString().padStart(3, '0')}
      </Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>
          IN |{' '}
          {countIn.toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.count}>
          OUT |{' '}
          {countOut.toString()
            .padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{...styles.buttonStyle, backgroundColor: `${selectedButton === 'IN' ? '#1AD470' : '#848482'}`}} onPress={() => handleButtonPress('IN')}>
           <Text style={styles.buttonText}>IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonStyle, backgroundColor: `${selectedButton === 'OUT' ? '#F24008' : '#848482'}`}} onPress={() => handleButtonPress('OUT')}>
           <Text style={styles.buttonText}>OUT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {device == null ? (
          <Text>No Device found</Text>
        ) : (
          <>
            <View style={styles.overlay} />
            <Camera
              style={styles.camera}
              device={device}
              isActive={!scanned}
              codeScanner={codeScanner}
              torch={flashLightOn}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={toggleFlashLight}>
              <Icon name="flash" size={24} color={flashLightOn === 'off' ? '#fff' : '#FFFF80'}/>
            </TouchableOpacity>
          </>
        )}
      </View>
      </View>
      <Text style={styles.lastScannedNumber}>
        Last scanned Vehicle No : <Text style={{fontWeight:'700', fontSize:18, color:'black'}}>{lastScannedNumber}</Text>
      </Text>
      <Text style={styles.lastScannedNumber}>
        Location : <Text style={{fontWeight:'700', fontSize:18, color:'black'}}>{factoryCode}</Text>
      </Text>
      {loading && <ActivityIndicator color="blue" />}
    </View>
  );
});

export default VehicleScan;

