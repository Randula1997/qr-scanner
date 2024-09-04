/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import {Text, Card} from '@rneui/themed';
import styles from './styles';

const ProductionData = (data: any) => {
  return (
    <>
      <FlatList
        data={data.data}
        renderItem={({item, index}) => (
          <>
          <Card containerStyle= {styles.titleSection}>
            <Card.Title style={styles.cardTitle}>
              <Text style={styles.textLine}>{item.lineNo}</Text>
            </Card.Title>
            <Card.Title style={styles.cardTitle}>
              <Text style={styles.styleNo}>{item.styleNo}</Text>
            </Card.Title>
          </Card>
          <Card containerStyle={styles.productionCard}>
              <View key={index}>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>CARDRE </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.planCarder}</Text>
                </View>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>WORKINGHOURS </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.workingHours}</Text>
                </View>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>TOTAL W/IN </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.totalOutput}</Text>
                </View>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>SMV </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.smv}</Text>
                </View>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>SAH </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.sah.toFixed(2)}</Text>
                </View>
                <View style={styles.textLine}>
                  <Text style={styles.fontStyle}>EFF </Text>
                  <Text style={styles.fontStyle}>-</Text>
                  <Text style={styles.fontStyle}>{item.efficiency.toFixed(2)}</Text>
                </View>
              </View>
            </Card>
          </>
        )}
      />
    </>
  );
};

export default ProductionData;
