/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, Text, FlatList, ScrollView, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import { clearItem } from '../database/databaseService';

export interface TableRowProps {
    [x: string]: any;
    assetNo: string;
    departmentName: string;
    condition: string;
  }

  interface TableProps {
    data: TableRowProps[];
  }

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.headerCell}>Asset No</Text>
    <Text style={styles.headerCell}>Dep</Text>
    <Text style={styles.headerCell}>Status</Text>
    <Text style={styles.headerCell}>Action</Text>
  </View>
);

const TableRows: React.FC<TableProps> = React.memo(({data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedAssetNo, setSelectedAssetNo] = useState('');

  const handleOpenModal = (index: number) => {
    setSelectedItemIndex(index);
    setSelectedAssetNo(data[index].assetNo);
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    if (selectedItemIndex !== -1) {
      clearItem(selectedItemIndex);
      setModalVisible(false);
    }
  };
  return (
    <><FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.assetNo}</Text>
            <Text style={styles.tableCell}>{item.departmentName}</Text>
            <Text
              style={[
                styles.tableCell,
                { color: item.condition === 'Defected' ? '#FF7F7F' : 'black' },
              ]}>
              {item.condition}
            </Text>
            <TouchableOpacity style={[styles.tableCell, {alignItems:'center'}]} onPress={() => handleOpenModal(index)}>
                <Text style={{color:'#FF7F7F', fontSize:10}}>Delete</Text>
              </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        } }
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure, you want to delete <Text style={styles.assetNo}>{selectedAssetNo}</Text>? </Text>
            <View style={{flex:0,  flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity style={styles.buttonYes} onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNo} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal></>
  );
});

const Table: React.FC<TableProps> = React.memo(({data}) => {
  return (
    <View style={styles.tableContainer}>
      <ScrollView horizontal>
        <View>
          <TableHeader />
          <TableRows data={data} />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  tableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontSize: 10,
    width: 100
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
    marginTop:20
  },
  buttonNo: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 80,

    marginTop:20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  assetNo: {
    fontWeight: 'bold',
  },
});

export default Table;
