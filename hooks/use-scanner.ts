import { useEffect, useRef, useState } from "react";
import { Alert, Vibration } from "react-native";
import SyncStorage from "sync-storage";
import {
    useCameraDevice,
    useCodeScanner,
  } from 'react-native-vision-camera';
import axios from "axios";
import { clearData, getData, storeData } from "../database/databaseService";
import { TableRowProps } from "../tables/dataTable";

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
          uploadSuccess = false; 
          break; 
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
    loading
  }

}

export default useScanner;