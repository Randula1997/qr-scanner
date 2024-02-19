import React from 'react';
import {Text, View, Image, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import { Card } from '@rneui/base';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import useHome from '../../hooks/use-home';
import ShipmentCard from './Shipment';
import styles from './styles';

const Home = ({navigation}) => {
  const {
    userName,
    timeOfDay,
    width,
    chartData,
    loading,
    sahSum,
    pieData,
    efficiency,
    loadingStyles,
    upComingStyles,
    setModalVisible,
    modalVisible
  } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleSection}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{width: 62, height: 62}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{gap: 10, width:150, height: 54}}>
            <Text style={{fontFamily:'PontanoSans-Regular', fontSize: 14, fontWeight:'200', color:'#252525'}}>Hi {timeOfDay}!</Text>
            <Text style={{fontFamily:'PontanoSans-Regular', fontSize: 20, fontWeight:'500'}}>{userName}</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/bell-icon.png')}
          style={{width: 30, height: 30}}
        />
      </View>
      <Text style={styles.welcome} >Simple Anytime Anywhere</Text>
      <Text style={{fontSize: 13, marginLeft:30, marginTop:20, fontWeight: '500', fontFamily:'Roboto-Medium'}} >DISCOVER PRODUCTION STATUS</Text>
      <View style={{marginLeft: 20}}>
        <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={1} >
          <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
            <View style={[{width: width * 0.7} ,styles.slider]}>
              <Card containerStyle={[styles.card,{width: width * 0.7 }]}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                  ) :
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
                        renderTooltip={(item: any) => {
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
                        xAxisLabelTextStyle={{ fontSize: 7, color: 'black' }} />
                        <View style={[styles.summaryCard,{ paddingVertical: 12, width: '100%' }]}>
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
              <Card containerStyle={[styles.card,{ width: width * 0.7, justifyContent:'center', alignItems:'center' }]} >
                {loading ? (
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
                    </View><View style={[styles.summaryCard, {paddingVertical: 10, width: width * 0.65}] }>
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
      <Text style={styles.upComingShipment} >UP COMING SHIPMENT</Text>
      <View style={{ flex: 1 }}>
      {loadingStyles ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={upComingStyles}
          style={{height: 100}}
          renderItem={({ item }) => (
            <ShipmentCard item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
    <View style={{height:  70, justifyContent: 'center', alignItems: 'center', marginTop:10}}>
      <TouchableOpacity  onPress={() => setModalVisible(true)}>
        <View style={styles.scanButton}>
            <Image source={require('../../assets/images/scan.png')} />
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity >
          <Image source={require('../../assets/images/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/images/category.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/images/airpod.png')} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/images/profileIcon.png')} />
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
    {modalVisible && <View style={styles.overlay} />}
    </SafeAreaView>
  );
};

export default Home;
