/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';

export interface DataItem {
    efficiency: number;
    lineNo: string;
    planCarder: number;
    sah: number;
    smv: number;
    styleNo: string;
    totalOutput: number;
    workingHours: number;
  }
  
  export interface BarChartData {
    label: string;
    value: number;
  }

const useReports = () => {
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
      label: item.lineNo.slice(0, 1) + item.lineNo.slice(4),
      value: item.sah,
    }));
    setBarChartData(chartData);
  }, [data]);

  const getLinewiseProduction = async () => {
    setLoading(true);
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

  const DatepickerOnChange = () => {
    setShowDatePicker(true);
  };

  return {
    date,
    DatepickerOnChange,
    showDatePicker,
    loading,
    uniqueLineNos,
    totalPlanCarder,
    barChartData,
    data,
    onChange
  }
}

export default useReports;