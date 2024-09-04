/* eslint-disable prettier/prettier */
import { Card } from '@rneui/base';
import React from 'react';
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';

const HomeModal = ({navigation, modalVisible, setModalVisible}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontFamily:'Lato-Regular', fontSize:15}}>ITRACK CORE MODULE</Text>
              <View style={{ flexDirection:'row'}}>
                <TouchableOpacity onPress={() => {navigation.navigate('VehicleScan'); setModalVisible(false)}} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={styles.modalIcon}>
                    <Image source={require('../../assets/images/scannerImage.png')}/>
                  </Card>
                  <Text style={styles.modalItemText}>Scan Vehicles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('ScannerHome'); setModalVisible(false)}} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={styles.modalIcon}>
                    <Image source={require('../../assets/images/scanVehicle.png')}/>
                  </Card>
                    <Text style={styles.modalItemText}>Scan Assets</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Reports'); setModalVisible(false)}} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={styles.modalIcon}>
                    <Image source={require('../../assets/images/reports.png')}/>
                  </Card>
                  <Text style={styles.modalItemText}>Production Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </TouchableWithoutFeedback>
    </Modal>
    )
}

export default HomeModal;