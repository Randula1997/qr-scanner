/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_STORAGE_KEY = 'offlineData';

const storeData = async (data: any) => {
  try {
    const existingData = await getData();
    const newData = [...existingData, data];
    await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
  }
};

const getData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(DATA_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    return [];
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.removeItem(DATA_STORAGE_KEY);
  } catch (error) {
  }
};

const clearItem = async (itemIndex: number) => {
  try {
    const existingData = await getData();
    const newData = existingData.filter((_: any, index: number) => index !== itemIndex);
    await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
  }
};

const clearItemsByAssetNos = async (assetNos: string[]) => {
  try {
    const existingData = await getData();
    const newData = existingData.filter((item:any) => !assetNos.includes(item.assetNo));
    await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
  }
};

export {storeData, getData, clearData, clearItem, clearItemsByAssetNos};
