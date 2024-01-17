/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Vibration,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import Table, { TableRowProps } from '../tables/dataTable';
import { clearData, getData, storeData } from '../database/databaseService';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

interface ScannedItem{
    tenantId: string;
    factoryCode: string;
    assetNo: string;
    departmentName: string;
    date: string ;
    condition: any;
}

export default function Scanner() {
  const factoryCode = SyncStorage.get('factoryCode');
  const tenantId = SyncStorage.get('tenantId');
  const selectedDepartment = SyncStorage.get('department');

//   const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [lastScannedNumber, setLastScannedNumber] = useState('');
  const [selectedButton, setSelectedButton] = useState('Usable');
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [tableData, setTableData] = useState<TableRowProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchScannedItems = async () => {
    const storedItems = await getData();
    setTableData(storedItems);
  };
  // useEffect(() => {
  //   fetchScannedItems();
  // }, []);

  const handleUploadAll = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/dailyAssetVerification/UploadBulk';

    const batchSize = 10; // Set an appropriate batch size
    const totalItems = tableData.length;

    setLoading(true);

    for (let i = 0; i < totalItems; i += batchSize) {
      const batch = tableData.slice(i, i + batchSize);
      const payload = {
        scans: batch,
      };

      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          clearData();
          Alert.alert('Data Uploaded');
        } else {
          console.error('Upload failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setLoading(false);
  };

  const handleBarCodeScanned = ({ data }: BarCodeReadEvent) => {
    const machineNumbers = tableData.map((item, index) => item.assetNo);
    if (!machineNumbers.includes(data)) {
      setScanned(true);
      Vibration.vibrate();
      setLastScannedNumber(data);
      const scannedItem = {
        tenantId: tenantId,
        factoryCode: factoryCode,
        assetNo: data,
        departmentName: selectedDepartment,
        date: new Date().toISOString().split('T')[0],
        condition: selectedButton,
      };
      setScannedItems((prevScannedItems) => [...prevScannedItems, scannedItem]);
      storeData(scannedItem);
    } else {
      setScanned(false);
      Alert.alert(`Already Scanned: ${data} `);
    }
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
            .filter((item) => item.condition === 'Usable')
            .length.toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.count}>
          DM |{' '}
          {tableData
            .filter((item) => item.condition === 'Defected')
            .length.toString()
            .padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{backgroundColor: `${selectedButton === 'Usable' ? '#1AD470' : '#848482'}`, width:90, height:40, borderRadius:5, alignItems:'center', justifyContent: 'center'}} onPress={() => handleButtonPress('Usable')}>
           <Text style={styles.buttonText}>USABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: `${selectedButton === 'Defected' ? '#F24008' : '#848482'}`, width:90, height:40, borderRadius:5, alignItems:'center', justifyContent: 'center'}} onPress={() => handleButtonPress('Defected')}>
           <Text style={styles.buttonText}>DEFECTED</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
        <QRCodeScanner
          onRead={handleBarCodeScanned}
          cameraStyle={styles.camera}
          reactivate={true}
          reactivateTimeout={2000}
        />
      </View>

      </View>
      <Text style={styles.lastScannedNumber}>
        Last scanned Asset No : <Text style={{fontWeight:'700', fontSize:15}}>{lastScannedNumber}</Text>
      </Text>
      <Table data={tableData} />
      <Button
        onPress={() => handleUploadAll()}
        title={loading ? 'Uploading...' : 'Upload All'}
        color="blue"
        disabled={loading}
      />
      {loading && <ActivityIndicator color="blue" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 10,
    minWidth: 150,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: 'rgba(8, 130, 242, 0.12)',
    padding: 10,
    marginRight: 70,
    marginLeft: 70,
  },
  totalCount: {
    fontSize: 100,
    textAlign: 'center',
    color: '#0882F2',
    marginTop: 5,
  },
  count: {
    fontSize: 30,
    fontWeight: '700'
  },
  cameraContainer: {
    width: '60%',
    aspectRatio: 1,
    overflow: 'hidden',
    alignSelf:'center'
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  centerText: {
    fontSize: 18,
    color: 'white',
  },
  lastScannedNumber: {
    textAlign: 'center',
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 20,
    marginLeft: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent: 'center',
  },
});
