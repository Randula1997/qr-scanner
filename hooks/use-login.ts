/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import SyncStorage from 'sync-storage';

type RootStackParamList = {
    ScannerHome: any;
    Home: any;
  };

  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

  type Props = {
    navigation: HomeScreenNavigationProp;
  };

const useLogin = ({navigation}: Props) => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [factoryCode, setFactoryCode] = useState('');
  const [factoryNames, setFactoryNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFactoryCodes();
  }, []);

  const handleLogin = async () => {
    const apiUrl = 'http://124.43.17.223:8020/itrack/account/login';

    try {
      const response = await axios.post(apiUrl, {
        usernameOrEmailAddress: username,
        password,
        tenancyName: factoryCode,
      });

      if (!response.data.success) {
        throw new Error('Login failed');
      }
      navigation.navigate('Home');
      SyncStorage.set('userName', username);
    } catch (error) {
      console.error('Login Error, ', error);
    }
  };

  const fetchFactoryCodes = async () => {
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/department/GetTenants';

    try {
      const response = await axios.post(apiUrl);
      setLoading(false);
      if (!response.data.success) {
        throw new Error('Data not Available');
      }

      const data = response.data;

      const names = data.result.items.map(
        (item: any, index: number) => item.tenancyName,
      );
      const tenantIds = data.result.items.map(
        (item: any, index: number) => item.id,
      );
      setFactoryNames(names);
      setIds(tenantIds);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    factoryNames,
    setFactoryCode,
    ids,
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  }
}

export default useLogin;