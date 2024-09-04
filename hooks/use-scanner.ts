/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import { Alert, Vibration } from 'react-native';
import SyncStorage from 'sync-storage';
import {
    useCameraDevice,
    useCodeScanner,
  } from 'react-native-vision-camera';
import axios from 'axios';
import { clearData, clearItemsByAssetNos, getData, storeData } from '../database/databaseService';
import { TableRowProps } from '../tables/dataTable';

interface ScannedItem {
    tenantId: string;
    factoryCode: string;
    assetNo: string;
    departmentName: string;
    date: string;
    condition: any;
  }

const useScanner = () => {
  const factoryCode = SyncStorage.get('factoryCode');
  const tenantId = SyncStorage.get('tenantId');
  const selectedDepartment = SyncStorage.get('department');
  const [scanned, setScanned] = useState(false);
  const [lastScannedNumber, setLastScannedNumber] = useState('');
  const [selectedButton, setSelectedButton] = useState('Usable');
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [tableData, setTableData] = useState<TableRowProps[]>([]);
  const [uploadedAssetNos, setUploadedAssetNos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [flashLightOn, setFlashLightOn] = useState<'off' | 'on' | undefined>(
    'off',
  );
  const alertVisibleRef = useRef(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const device = useCameraDevice('back');

  const fetchScannedItems = async () => {
    const storedItems = await getData();
    setTableData(storedItems);
  };

  const fetchUploadedItems = async () => {
    const apiUrl = 'http://124.43.17.223:8020/ITRACK/api/services/app/dailyAssetVerification/GetDailyAssetVerficationByDate';
    try {
      const payload = {
        factoryCode:factoryCode,
        date: new Date().toISOString().split('T')[0]
      }
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUploadedData(response.data.result.items);
    } catch (error){
      throw new Error('Failed to fetch uploaded items');
    }
  };

  const handleUploadAll = async () => {
    setLoading(true);
    const apiUrl = 'http://124.43.17.223:8020/ITRACK/api/services/app/dailyAssetVerification/UploadBulk';
    let uploadSuccess = true;
    try {
      const payload = {
        scans: tableData,
      };
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200 && response.status !== 201) {
        fetchUploadedItems();
        const unuploadedItems = tableData.filter(tableItem => {
          return !uploadedData.some(uploadedItem => uploadedItem.assetNo === tableItem.assetNo);
        });
        if (unuploadedItems.length > 0){
          setUploadedAssetNos(unuploadedItems.map(item => item.assetNo));
          uploadSuccess = false;
        }
      }
      if (uploadSuccess) {
        clearData();
        Alert.alert('Data Uploaded');
      } else {
        clearItemsByAssetNos(uploadedAssetNos);
        Alert.alert('Data partially Uploaded, Please upload again');
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

  return {
    tableData,
    selectedButton,
    handleButtonPress,
    device,
    scanned,
    codeScanner,
    flashLightOn,
    toggleFlashLight,
    lastScannedNumber,
    handleUploadAll,
    loading,
  };

};

export default useScanner;