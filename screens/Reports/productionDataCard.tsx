/* eslint-disable prettier/prettier */
import {Text, Card} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import styles from './styles';

const ProductionData = (data: any) => {
  // console.log('data', data);
  return (
    <>
      <FlatList
        data={data.data}
        renderItem={({item, index}) => (
          <Card containerStyle={styles.card}>
            <Card.Title>{item.lineNo}</Card.Title>
            <Card.Divider />
            {/* {data.map((u, i) => { */}
            <View key={index}>
              <View style={styles.textLine}>
                <Text>CARDRE: </Text>
                <Text>{item.planCarder}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>WORKINGHOURS: </Text>
                <Text>{item.workingHours}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>STYLENO: </Text>
                <Text>{item.styleNo}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>TOTAL W/IN: </Text>
                <Text>{item.totalOutput}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>SMV: </Text>
                <Text>{item.smv}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>SAH: </Text>
                <Text>{item.sah.toFixed(2)}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>EFF: </Text>
                <Text>{item.efficiency.toFixed(2)}</Text>
              </View>
            </View>
            {/* })} */}
          </Card>
        )}
      />
    </>
  );
};

export default ProductionData;
