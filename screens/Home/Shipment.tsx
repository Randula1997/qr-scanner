/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Card } from '@rneui/base';
import styles from './styles';

const ShipmentCard = ({item}) => {
    return (
        <Card containerStyle={styles.stylesCard}>
            <View style={{flex:1, flexDirection:'row', gap:20}}>
            <View style={{backgroundColor:'#fff', width: 83, height: 89, borderRadius:5}}>
                <Image
                    source={require('../../assets/images/styles.png')}
                />
            </View>
            <View style={{gap: 8}}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 12}}>Style No : {item.styleNo}</Text>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>Order qty : {item.orderQty}</Text>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>Warehouse In : {item.wareHouseIn}</Text>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>shipmentDate={item.shipmentDate}</Text>
                </View>
            </View>
        </Card>
    )
}

export default ShipmentCard;