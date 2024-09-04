/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import { BarChartData } from './use-reports';

const useHome = () => {
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
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    getLinewiseProduction();
    getUpcomingShipments();
  }, [dateNow]);

  useEffect(() => {
    getCurrentTimeOfDay();
    const intervalId = setInterval(getCurrentTimeOfDay, 60000);
    return () => clearInterval(intervalId);
  },[]);

  useEffect(()=>{
    requestPermission();
  },[hasPermission, requestPermission]);

  const getLinewiseProduction = async () => {
    const apiUrl =
      `${process.env.BASE_URI}/manualProduction/GetDailyLineWiseProductionAndCardre`;

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
        setEfficiency(dailyEff + '%' );
      } catch (error) {
        setLoading(false);
      }
    };

  const getUpcomingShipments = async () => {
    const apiUrl =
    `${process.env.BASE_URI}/warehouseHeader/GetShipmentPlanDetailReport`;

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
        shipmentDate: item.planExFtyDate ? new Date(item.planExFtyDate).toISOString().split('T')[0] : null,
      })));
    } catch (error) {
      setLoadingStyles(false);
    }
  };

  const getCurrentTimeOfDay = useCallback(() => {
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
  }, []);

  return {
    timeOfDay,
    userName,
    width,
    chartData,
    loading,
    sahSum,
    pieData,
    efficiency,
    loadingStyles,
    upComingStyles,
    setModalVisible,
    modalVisible,
  };
};

export default useHome;