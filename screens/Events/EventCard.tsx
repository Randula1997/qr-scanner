/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import {Text, Card} from '@rneui/themed';
import styles from './styles';

const EventCard = (data: any) => {
  return (
    <>
      <FlatList
        data={data.data}
        renderItem={({item, index}) => (
          <Card containerStyle={styles.card}>
            <View key={index}>
              <View style={styles.textLine}>
                <Text>Buyer Name: </Text>
                <Text>{item.buyerName}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>Creation Time: </Text>
                <Text>{item.creationTime}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>Event Name: </Text>
                <Text>{item.eventName}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>Expeted Date: </Text>
                <Text>{item.expectedDate}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>Order Inqurery No: </Text>
                <Text>{item.orderInqureryNo}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>Status: </Text>
                <Text style={{backgroundColor: `${item.status === 'Pending' ? 'yellow' : 'red'}`, padding:2}}>{item.status}</Text>
              </View>
            </View>
            {/* })} */}
          </Card>
        )}
      />
    </>
  );
};

export default EventCard;
