/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {BarChart} from 'react-native-gifted-charts';
import useReports from '../../hooks/use-reports';
import SummaryCard from './summaryCard';
import ProductionData from './productionDataCard';
import styles from './styles';

const Reports = () => {
  const {
    date,
    data,
    onChange,
    DatepickerOnChange,
    showDatePicker,
    loading,
    totalPlanCarder,
    barChartData
  } = useReports();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }} />
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
      {loading ?
      ( <ActivityIndicator size="large" color="#0000ff" /> ) : (
        <ScrollView removeClippedSubviews>
          <Text style={{fontFamily:'Lato-Regular', fontSize:16, marginBottom:5}}>Pick Date</Text>
          <View style={styles.dateContainer}>
            <Image source={require('../../assets/images/Calendar.png')} />
            <TouchableOpacity
              onPress={DatepickerOnChange}
              style={{padding: 10, borderRadius: 8}}>
              <Text style={{color: '#333333', fontFamily:'Lato-Regular', fontSize: 20}}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/Clear.png')} />
          </View>
          <View style={styles.title}>
            <Text style={{fontFamily:'Roboto-Medium', fontSize:36}}>Production </Text>
            <Text style={{fontFamily:'Roboto-Regular', fontSize:30, color:'#00B4D8'}}>Status</Text>
          </View>
          <View style={{marginBottom: 30, marginTop: 20}}>
            {totalPlanCarder > 0 && (
              <BarChart
                data={barChartData}
                frontColor="#00B4D8"
                barWidth={18}
                yAxisColor="gray"
                xAxisColor="gray"
                spacing={10}
                barBorderRadius={8}
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                renderTooltip={(item: any, index: number) => {
                  return (
                    <View
                      style={{
                        marginLeft: -6,
                        backgroundColor: '#ffcefe',
                        paddingHorizontal: 6,
                        paddingVertical: 1,
                        borderRadius: 4,
                      }}>
                      <Text style={{fontSize: 8}}>
                        {item.label}: {item.value.toFixed(2)}
                      </Text>
                    </View>
                  );
                }}
                xAxisLabelTextStyle={{fontSize: 7, color: 'black'}}
              />
            )}
          </View> 
          <View style={styles.summaryTitle}>
            <Text style={{fontFamily:'Roboto-Bold', fontSize:25}}>{date.toDateString()}</Text>
            <Text style={{fontFamily:'Roboto-Regular', fontSize:16}}>Line wise production summary</Text>
          </View>
          <SummaryCard data={data} totalPlanCarder={totalPlanCarder} />
          <ProductionData data={data} />
        </ScrollView>
      )}
    </View>
  );
};

export default Reports;
