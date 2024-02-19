import React from 'react';
import {Text, View, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {ScrollView} from 'react-native';
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
        }}>
        <Text>Date: </Text>
        <TouchableOpacity
          onPress={DatepickerOnChange}
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
      {loading ? 
      <View>
        <Text>Loading</Text>
      </View> : (
        // <ScrollView>
        //   {totalPlanCarder > 0 && (
        //     <View style={{marginBottom: 30, marginTop: 20}}>
        //       <BarChart
        //         data={barChartData}
        //         frontColor="#2059B7"
        //         barWidth={18}
        //         yAxisColor="gray"
        //         xAxisColor="gray"
        //         spacing={10}
        //         rotateLabel
        //         renderTooltip={(item: any, index: number) => {
        //           return (
        //             <View
        //               style={{
        //                 marginLeft: -6,
        //                 backgroundColor: '#ffcefe',
        //                 paddingHorizontal: 6,
        //                 paddingVertical: 1,
        //                 borderRadius: 4,
        //               }}>
        //               <Text style={{fontSize: 8}}>
        //                 {item.label}: {item.value.toFixed(2)}
        //               </Text>
        //             </View>
        //           );
        //         }}
        //         xAxisLabelTextStyle={{fontSize: 7, color: 'black'}}
        //       />
        //     </View>
        //   )}
        //   <SummaryCard data={data} totalPlanCarder={totalPlanCarder} />
        //   <ProductionData data={data} />
        // </ScrollView>
        <ScrollView>
        <View style={{marginBottom: 30, marginTop: 20}}>
          {totalPlanCarder > 0 && (
            <BarChart
              data={barChartData}
              frontColor="#2059B7"
              barWidth={18}
              yAxisColor="gray"
              xAxisColor="gray"
              spacing={10}
              rotateLabel
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
        <SummaryCard data={data} totalPlanCarder={totalPlanCarder} />
        <ProductionData data={data} />
      </ScrollView>
      )}
    </View>
  );
};

export default Reports;
