/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {clearData} from '../database/databaseService';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import SyncStorage from 'sync-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const Home = ({navigation}: Props) => {
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
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
        console.error(error);
      }
    };

    fetchData();
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 200,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#898989',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    height: 40,
    width: '80%',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  buttonYes: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 80,
    marginTop: 20,
  },
  buttonNo: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 80,
    marginTop: 20,
  },
  dropdown: {
    flex: 1,
    marginTop: 5,
    alignContent: 'flex-end',
    alignItems: 'stretch',
    width: 200,
    height: 170,
    backgroundColor: '#fff',
    fontSize: 12,
    borderRadius: 5,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
});

export default Home;
