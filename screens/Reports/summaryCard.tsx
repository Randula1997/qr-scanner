/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/base';
import styles from './styles';

const SummaryCard = ({data, totalPlanCarder}) => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={{fontFamily:'Roboto-Black', fontSize:20}}>Summary</Card.Title>
            <Card.Divider style={{borderWidth: 1}}/>
              <View style={styles.summary}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>TOTAL CARDRE</Text>
                  <Text style={styles.summaryNumbers}>{totalPlanCarder}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>TOTAL W/IN</Text>
                  <Text style={styles.summaryNumbers}>
                    {data.reduce((total: any, item: { totalOutput: any; }) => total + item.totalOutput, 0)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>TOTAL SAH</Text>
                  <Text style={styles.summaryNumbers}>
                    {data.reduce((total: any, item: { sah: any; }) => total + item.sah, 0).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>EFFICIENCY</Text>
                  <Text style={styles.summaryNumbers}>
                    {(
                      (data.reduce((total: any, item: { sah: any; }) => total + item.sah, 0) /
                        (totalPlanCarder * 9.5)) *
                      100
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
        </Card>
    )
}

export default SummaryCard;