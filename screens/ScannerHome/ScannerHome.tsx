/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert, Modal, Text, TouchableOpacity, View} from 'react-native';
import {clearData} from '../../database/databaseService';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import SyncStorage from 'sync-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


type RootStackParamList = {
  Scanner: any;
};

type ScannerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scanner'
>;

type Props = {
  navigation: ScannerScreenNavigationProp;
};

const ScannerHome = React.memo(({navigation}: Props) => {
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const fetchDepartmentNames = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/department/GetDepartmentNames';

    try {
      const response = await axios.post(apiUrl);

      if (!response.data.success) {
        throw new Error('Data not Available');
      }

      const data = response.data;

      const names = data.result.items.map(
        (item: {name: any}, index: number) => item.name,
      );

      setDepartmentNames(names);
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchDepartmentNames();
  }, []);

  const handleScanButtonPress = () => {
    if (selectedDepartment) {
      navigation.navigate('Scanner');
    } else {
      Alert.alert('Warning', 'Please select a department to scan.');
    }
  };

  const handleClearAll = () => {
    clearData();
    setModalVisible(false);
    Alert.alert('Data cleared');
  };

  const ClearDataModalContent = () => (
    <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure, you want to delete?</Text>
            <View style={{flex: 0, flexDirection: 'row', gap: 45}}>
              <TouchableOpacity
                style={styles.buttonYes}
                onPress={handleClearAll}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNo}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Department</Text>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          buttonStyle={{
            width: 290,
            backgroundColor: '#fff',
            height: 35,
          }}
          buttonTextStyle={{
            fontSize: 14,
            color: '#2059B7',
            textAlign: 'left',
            fontWeight: 600,
          }}
          dropdownStyle={styles.dropdown}
          rowStyle={{
            alignItems: 'flex-end',
            borderBottomColor: '#F5F2F2',
            height: 40,
            padding: 10,
          }}
          selectedRowStyle={{backgroundColor: '#2059B7'}}
          selectedRowTextStyle={{color: '#fff'}}
          dropdownOverlayColor="transparent"
          rowTextStyle={{
            fontSize: 12,
            fontFamily: 'Poppins',
            fontWeight: '300',
          }}
          data={departmentNames}
          onSelect={selectedItem => {
            setSelectedDepartment(selectedItem);
            SyncStorage.set('department', selectedItem);
          }}
          buttonTextAfterSelection={selectedItem => selectedItem}
          rowTextForSelection={item => item}
        />
        <Icon
          name="caret-down"
          size={20}
          color="#2059B7"
          style={styles.dropdownIcon}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {height: 50, borderRadius: 10}]}
        disabled={!selectedDepartment}
        onPress={() => handleScanButtonPress()}>
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {height: 50, borderRadius: 10, marginTop: 10, backgroundColor: 'red'},
        ]}
        disabled={!selectedDepartment}
        onPress={() => handleOpenModal()}>
        <Text style={styles.buttonText}>Clear All Data</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <ClearDataModalContent />
      </Modal>
    </View>
  );
});

export default ScannerHome;
