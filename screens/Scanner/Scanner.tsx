/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {useRef} from 'react';
import {
  Text,
  View,
  Button,
  Vibration,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import Table, {TableRowProps} from '../../tables/dataTable';
import {clearData, getData, storeData} from '../../database/databaseService';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

interface ScannedItem {
  tenantId: string;
  factoryCode: string;
  assetNo: string;
  departmentName: string;
  date: string;
  condition: any;
}

const Scanner = React.memo(() => {
  const factoryCode = SyncStorage.get('factoryCode');
  const tenantId = SyncStorage.get('tenantId');
  const selectedDepartment = SyncStorage.get('department');

  const [scanned, setScanned] = useState(false);
  const [lastScannedNumber, setLastScannedNumber] = useState('');
  const [selectedButton, setSelectedButton] = useState('Usable');
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [tableData, setTableData] = useState<TableRowProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [flashLightOn, setFlashLightOn] = useState<'off' | 'on' | undefined>(
    'off',
  );
  const alertVisibleRef = useRef(false);

  const device = useCameraDevice('back');

  const fetchScannedItems = async () => {
    const storedItems = await getData();
    setTableData(storedItems);
  };

  const handleUploadAll = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/dailyAssetVerification/UploadBulk';

    const batchSize = 10;
    const totalItems = tableData.length;
    let uploadSuccess = true;

    setLoading(true);

    try {
      for (let i = 0; i < totalItems; i += batchSize) {
        const batch = tableData.slice(i, i + batchSize);
        const payload = {
          scans: batch,
        };

        const response = await axios.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          uploadSuccess = false; // Set flag to false if any batch fails
          break; // Exit loop if any batch fails
        }
      }

      if (uploadSuccess) {
        clearData();
        Alert.alert('Data Uploaded');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = (assetNo: any) => {
    const machineNumbers = tableData.map((item, index) => item.assetNo);
    if (!machineNumbers.includes(assetNo)) {
      Vibration.vibrate();
      setScanned(true);
      setLastScannedNumber(assetNo);
      const scannedItem = {
        tenantId: tenantId,
        factoryCode: factoryCode,
        assetNo: assetNo,
        departmentName: selectedDepartment,
        date: new Date().toISOString().split('T')[0],
        condition: selectedButton,
      };
      setScannedItems(prevScannedItems => [...prevScannedItems, scannedItem]);
      storeData(scannedItem);
      setTimeout(() => {
        setScanned(false);
      }, 500);
    } else {
      setScanned(false);
      if (!alertVisibleRef.current) {
        alertVisibleRef.current = true;
        Alert.alert(`Already Scanned: ${assetNo}`, '', [
          {
            text: 'OK',
            onPress: () => {
              setScanned(false);
              alertVisibleRef.current = false;
            },
          },
        ]);
      }
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!scanned) {
        handleBarCodeScanned(codes[0].value);
      }
    },
  });

  const toggleFlashLight = () => {
    setFlashLightOn(prev => (prev === 'on' ? 'off' : 'on'));
  };

  useEffect(() => {
    fetchScannedItems();
  }, [tableData]);

  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>
        {tableData.length.toString().padStart(3, '0')}
      </Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>
          UM |{' '}
          {tableData
            .filter(item => item.condition === 'Usable')
            .length.toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.count}>
          DM |{' '}
          {tableData
            .filter(item => item.condition === 'Defected')
            .length.toString()
            .padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: `${
              selectedButton === 'Usable' ? '#1AD470' : '#848482'
            }`,
          }}
          onPress={() => handleButtonPress('Usable')}>
          <Text style={styles.buttonText}>USABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: `${
              selectedButton === 'Defected' ? '#F24008' : '#848482'
            }`,
          }}
          onPress={() => handleButtonPress('Defected')}>
          <Text style={styles.buttonText}>DEFECTED</Text>
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
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleFlashLight}>
                <Icon
                  name="flash"
                  size={24}
                  color={flashLightOn === 'off' ? '#fff' : '#FFFF80'}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <Text style={styles.lastScannedNumber}>
        Last scanned Asset No :{' '}
        <Text style={{fontWeight: '700', fontSize: 15}}>
          {lastScannedNumber}
        </Text>
      </Text>
      <Table data={tableData} />
      <Button
        onPress={() => handleUploadAll()}
        title={loading ? 'Uploading...' : 'Upload All'}
        color="#2059B7"
        disabled={loading}
      />
      {loading && <ActivityIndicator color="blue" />}
    </View>
  );
});

export default Scanner;
