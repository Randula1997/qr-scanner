/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import {Text, View, Image, SafeAreaView, Dimensions, ActivityIndicator, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';
import { Card } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SyncStorage from 'sync-storage';
import { BarChartData } from '../Reports/Reports';
import axios from 'axios';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Home = ({navigation}) => {

  const { hasPermission, requestPermission } = useCameraPermission();
  const userName = SyncStorage.get('userName');
  const factory = SyncStorage.get('factoryCode');
  const date = new Date();
  const toDate = new Date(date);
  const dateNow = date.toISOString().split('T')[0];
  toDate.setDate(date.getDate() + 7);
  const [loading, setLoading] = useState(true);
  const [loadingStyles, setLoadingStyles] = useState(true);
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [upComingStyles, setUpcomingStyles] = useState<any[]>([]);
  const { width } = Dimensions.get('window');
  const [sahSum, setSahSum] = useState(0);
  const [efficiency, setEfficiency] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getLinewiseProduction();
    getUpcomingShipments();
  }, [dateNow]);

  const getLinewiseProduction = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/manualProduction/GetDailyLineWiseProductionAndCardre';

      try {
        const response = await axios.post(apiUrl, {
          date: dateNow,
        });
        setLoading(false);
        if (!response.data.success) {
          throw new Error('Data not Available');
        }

        const data = response.data.result.items;
        setChartData(data.map((item: { lineNo: any; sah: any; }) => ({
          label: item.lineNo.slice(0, 1) + item.lineNo.slice(4),
          value: item.sah,
        })));
        const pieChartData = data.map((item: { efficiency: any; }) => ({
          value: item.efficiency,
        }));

        const maxEfficiencyValue = Math.max(...pieChartData.map((item: { value: any; }) => item.value));

        const updatedPieData = pieChartData.map((item: { value: number; }, index: number) => ({
          ...item,
          focused: item.value === maxEfficiencyValue,
          color:`rgb(${Math.round(120 * (index / pieChartData.length))}, ${Math.round(180 * (index / pieChartData.length))}, ${Math.round(225 * (index / pieChartData.length))})`,
        }));

        setPieData(updatedPieData);
        const totalSah = data.reduce((acc: any, obj: { sah: any; }) => acc + obj.sah, 0).toFixed(0);
        const dailyEff = ((data.reduce((acc: any, obj: { efficiency: any; }) => acc + obj.efficiency, 0)) / data.length).toFixed(0);
        setSahSum(totalSah);
        setEfficiency(dailyEff + "%" );
      } catch (error) {
        setLoading(false);
      }
    };

  const getUpcomingShipments = async () => {
    // setLoadingStyles(true);
    const apiUrl =
    'http://124.43.17.223:8020/ITRACK/api/services/app/warehouseHeader/GetShipmentPlanDetailReport';

    try {
      const response = await axios.post(apiUrl, {
        factory,
        fromDate: dateNow,
        toDate: toDate.toISOString().split('T')[0],
      });
      setLoadingStyles(false);
      if (!response.data.success) {
        throw new Error('Data not Available');
      }
      const styleData =  response.data.result.items;
      setUpcomingStyles(styleData.slice(0,10).map((item: { styleNo: string; orderQty: number; totalWarehouseInQty: number; planExFtyDate: any })=>({
        styleNo: item.styleNo,
        orderQty: item.orderQty,
        wareHouseIn: item.totalWarehouseInQty,
        shipmentDate: item.planExFtyDate ? new Date(item.planExFtyDate).toISOString().split('T')[0] : null
      })));
    } catch (error) {
      setLoadingStyles(false);
    }
  };

  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const getCurrentTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay('Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('Afternoon');
      } else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay('Evening');
      } else {
        setTimeOfDay('Night');
      }
    };

    getCurrentTimeOfDay();

    const intervalId = setInterval(getCurrentTimeOfDay, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(()=>{
    requestPermission();
  },[hasPermission, requestPermission]);

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={styles.titleSection}>
        <Image 
          source={require('../../assets/profile.png')}
          style={{width: 62, height: 62}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{gap: 10, width:150, height: 54}}>
            <Text style={{fontFamily:'PontanoSans-Regular', fontSize: 14, fontWeight:'200', color:'#252525'}}>Hi {timeOfDay}!</Text>
            <Text style={{fontFamily:'PontanoSans-Regular', fontSize: 20, fontWeight:'500'}}>{userName}</Text>
          </View>
        </View>
        <Icon name="bell" size={30} color="#4E4E4E" />
      </View>
      <Text style={styles.welcome} >Simple Anytime Anywhere</Text>
      <Text style={{fontSize: 13, marginLeft:30, marginTop:20, fontWeight: '500', fontFamily:'Roboto-Medium'}} >DISCOVER PRODUCTION STATUS</Text>
      <View style={{marginLeft: 20}}>
          <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={1} >
            <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                <View style={[{width: width * 0.7} ,styles.slider]}>
                <Card containerStyle={[styles.card,{borderRadius:18, width: width * 0.7, height:225 }]}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                    ):
                      (
                        <><BarChart
                        data={chartData}
                        frontColor="#00b4d8"
                        barWidth={10}
                        spacing={6}
                        noOfSections={1}
                        hideRules
                        height={112}
                        barBorderRadius={8}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        hideYAxisText
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
                              <Text style={{ fontSize: 8 }}>
                                {item.label}: {item.value.toFixed(2)}
                              </Text>
                            </View>
                          );
                        } }
                        xAxisLabelTextStyle={{ fontSize: 7, color: 'black' }} /><View style={{ alignItems: 'center', height: 55, justifyContent: 'center', paddingVertical: 12, borderRadius: 8, backgroundColor: '#FBFFC9', gap: 5, width: '100%' }}>
                          <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 22 }}>{sahSum}</Text>
                          <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Regular', fontSize: 10 }}>DAILY SAH SUMMARY</Text>
                        </View></>
                      )
                    }
                </Card>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
            <View style={[{width: width * 0.7},styles.slider]}>
              <Card containerStyle={[styles.card,{ borderRadius: 18, width: width * 0.7, height:225, justifyContent:'center', alignItems:'center' }]} >
                {loading? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) :
                  (
                    <><View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <PieChart
                        data={pieData}
                        donut
                        focusOnPress
                        radius={60}
                        innerRadius={30}
                        innerCircleColor={'#fff'}
                        centerLabelComponent={() => {
                          return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Text
                                style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                {efficiency}
                              </Text>
                            </View>
                          );
                        } } />
                    </View><View style={{ alignItems: 'center', height: 55, justifyContent: 'center', paddingVertical: 10, borderRadius: 8, backgroundColor: '#FBFFC9', gap: 5, width: width * 0.65 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 22 }}>{efficiency}</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Regular', fontSize: 10 }}>DAILY EFFICIENCY</Text>
                      </View></>
                  )
                }
              </Card>
            </View>
          </TouchableOpacity>
          
        </SwiperFlatList>
      </View>
      <Text style={{fontSize: 13, marginLeft:30, marginTop:20, paddingBottom:10, fontWeight: '500', fontFamily:'Roboto-Medium'}} >UP COMING SHIPMENT</Text>
      <View style={{ flex: 1 }}>
      {loadingStyles ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={upComingStyles}
          style={{height: 100}}
          pagingEnabled={true}
          renderItem={({ item }) => (
            <Card containerStyle={styles.stylesCard}>
              <View style={{flex:1, flexDirection:'row', gap:20}}>
                <View style={{backgroundColor:'#fff', width: 83, height: 89, borderRadius:5}}>
                  <Image
                    source={require('../../assets/styles.png')}
                  />
                </View>
                <View style={{gap: 8}}>
                  <Text style={{fontFamily: 'Roboto-Medium', fontSize: 13}}>Style No : {item.styleNo}</Text>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>Order qty : {item.orderQty}</Text>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>Warehouse In : {item.wareHouseIn}</Text>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10}}>shipmentDate={item.shipmentDate}</Text>
                </View>
              </View>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
    <View style={{height:  70, justifyContent: 'center', alignItems: 'center', marginTop:10}}>
      <TouchableOpacity  onPress={() => setModalVisible(true)}>
        <View style={{backgroundColor: '#1F9BB4', borderRadius:  30, width:  60, height:  60, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/scan.png')} />
        </View>
      </TouchableOpacity>
      <View style={{flex:  1, flexDirection: 'row',marginTop:-40, marginBottom:5, paddingHorizontal:10, width:'100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity >
          <Image source={require('../../assets/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/category.png')} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/airpod.png')} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/profileIcon.png')} />
        </TouchableOpacity>
      </View>
    </View>
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
                <TouchableOpacity onPress={() => navigation.navigate('ScannerHome')} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={{width:60, height:60, borderRadius:7, justifyContent:'center', alignItems:'center', marginBottom:10}}>
                    <Image source={require('../../assets/scannerImage.png')}/>
                  </Card>
                  <Text style={{fontFamily:'Lato-Regular', fontSize:10}}>Scan Vehicles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('VehicleScan')} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={{width:60, height:60, borderRadius:7, justifyContent:'center', alignItems:'center', marginBottom:10}}>
                    <Image source={require('../../assets/scanVehicle.png')}/>
                  </Card>
                  <Text style={{fontFamily:'Lato-Regular', fontSize:10}}>Scan Assets</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Reports')} style={{alignItems:'center', justifyContent:'center'}}>
                  <Card containerStyle={{width:60, height:60, borderRadius:7, justifyContent:'center', alignItems:'center', marginBottom:10}}>
                    <Image source={require('../../assets/reports.png')}/>
                  </Card>
                  <Text style={{fontFamily:'Lato-Regular', fontSize:10}}>Production Info</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
      </TouchableWithoutFeedback>
    </Modal>
    </SafeAreaView>
  );
};

export default Home;
