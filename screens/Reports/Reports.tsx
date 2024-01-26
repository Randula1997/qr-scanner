/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {Text, View, TouchableOpacity, Platform, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import ProductionData from './productionDataCard';
import {ScrollView} from 'react-native';
import {Card} from '@rneui/themed';
// import {BarChart} from 'react-native-chart-kit';
import {BarChart} from 'react-native-gifted-charts';

interface DataItem {
  efficiency: number;
  lineNo: string;
  planCarder: number;
  sah: number;
  smv: number;
  styleNo: string;
  totalOutput: number;
  workingHours: number;
}

interface BarChartData {
  label: string;
  value: number;
}

const Reports = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>([]);
  const [uniqueLineNos, setUniqueLineNos] = useState<Set<string>>(new Set());
  const [totalPlanCarder, setTotalPlanCarder] = useState<number>(0);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  useEffect(() => {
    getLinewiseProduction();
  }, [date]);

  useEffect(() => {
    const uniqueLineNosSet = new Set<string>();
    let totalPlanCarderSum = 0;

    data.forEach(item => {
      const {lineNo, planCarder} = item;

      if (!uniqueLineNosSet.has(lineNo)) {
        uniqueLineNosSet.add(lineNo);
        totalPlanCarderSum += planCarder;
      }
    });

    setUniqueLineNos(uniqueLineNosSet);
    setTotalPlanCarder(totalPlanCarderSum);
    const chartData = data.map(item => ({
      label: item.lineNo,
      value: item.sah,
    }));
    setBarChartData(chartData);
  }, [data]);

  const getLinewiseProduction = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/manualProduction/GetDailyLineWiseProductionAndCardre';

    try {
      const response = await axios.post(apiUrl, {
        date: date.toISOString().split('T')[0],
      });
      setLoading(false);
      if (!response.data.success) {
        throw new Error('Data not Available');
      }

      const data = response.data.result.items;
      setData(data);
      console.log('date', date);
      console.log('data', data);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    getLinewiseProduction();
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text>Date: </Text>
        <TouchableOpacity
          onPress={showDatepicker}
          style={{backgroundColor: 'gray', padding: 10, borderRadius: 8}}>
          <Text style={{color: '#fff'}}>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
            minimumDate={new Date(2010, 10, 20)}
            timeZoneOffsetInMinutes={0}
          />
        )}
      </View>
      {!loading && data.length > 0 && (
        <ScrollView>
          {!loading && totalPlanCarder > 0 && (
            <View style={{marginBottom: 30, marginTop: 20}}>
              <BarChart
                data={barChartData}
                frontColor="#008577"
                barWidth={18}
                yAxisColor="gray"
                xAxisColor="gray"
                spacing={10}
                rotateLabel
                renderTooltip={
                  (item: any, index: number) => {
                    return (
                      <View
                        style={{
                          marginLeft: -6,
                          backgroundColor: '#ffcefe',
                          paddingHorizontal: 6,
                          paddingVertical: 1,
                          borderRadius: 4,
                        }}>
                        <Text style={{fontSize: 8}}>{item.label}: {item.value.toFixed(2)}</Text>
                      </View>
                    );
                  }
                }
                xAxisLabelTextStyle={{ fontSize: 7 }}
              />
            </View>
          )}
          <Card containerStyle={styles.card}>
            <Card.Title>Summary</Card.Title>
            <Card.Divider />
            <View>
              <View style={styles.textLine}>
                <Text>TOTAL CARDRE: </Text>
                <Text>{totalPlanCarder}</Text>
              </View>
              <View style={styles.textLine}>
                <Text>TOTAL W/IN: </Text>
                <Text>
                  {data.reduce((total, item) => total + item.totalOutput, 0)}
                </Text>
              </View>
              <View style={styles.textLine}>
                <Text>TOTAL SAH: </Text>
                <Text>
                  {data.reduce((total, item) => total + item.sah, 0).toFixed(2)}
                </Text>
              </View>
              <View style={styles.textLine}>
                <Text>EFFICIENCY: </Text>
                <Text>
                  {(
                    (data.reduce((total, item) => total + item.sah, 0) /
                      (totalPlanCarder * 9.5)) *
                    100
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </Card>
          <ProductionData data={data} />
        </ScrollView>
      )}
    </View>
  );
};

export default Reports;
