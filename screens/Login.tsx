/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import SelectDropdown from 'react-native-select-dropdown';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  Home: any;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [factoryCode, setFactoryCode] = useState('');
  const [factoryNames, setFactoryNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
        console.error(error);
        setLoading(false);
      }
    };

    fetchFactoryCodes();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.container}>
            <Image
              source={require('../assets/login-cover.jpeg')}
              style={{
                width: 270,
                height: 270,
                flexShrink: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />

            <View style={styles.inputWrapper}>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <View style={styles.dropdownContainer}>
                  <Icon name="map-marker" size={20} color="#2059B7" />
                  <SelectDropdown
                    buttonStyle={{
                      width: 290,
                      backgroundColor: '#fff',
                      height: 35,
                    }}
                    buttonTextStyle={{
                      fontSize: 14,
                      color: '#2059B7',
                      textAlign: 'left',
                      fontWeight: 400,
                    }}
                    dropdownStyle={styles.dropdown}
                    rowStyle={{
                      alignItems: 'flex-end',
                      borderBottomColor: '#F5F2F2',
                      height: 40,
                      padding: 10,
                    }}
                    selectedRowStyle={{backgroundColor: '#2059B7'}}
                    selectedRowTextStyle={{color: '#fff'}}
                    dropdownOverlayColor="transparent"
                    rowTextStyle={{
                      fontSize: 12,
                      fontFamily: 'Poppins',
                      fontWeight: '300',
                    }}
                    data={factoryNames}
                    defaultButtonText="Location"
                    onSelect={selectedItem => {
                      const idIndex = factoryNames.findIndex(
                        (x: any) => x === selectedItem,
                      );
                      setFactoryCode(selectedItem);
                      SyncStorage.set('factoryCode', selectedItem);
                      SyncStorage.set('tenantId', ids[idIndex]);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                  <Icon
                    name="caret-down"
                    size={20}
                    color="#2059B7"
                    style={styles.dropdownIcon}
                  />
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="user"
                size={20}
                style={{marginRight: 10}}
                color="#2059B7"
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                style={{marginRight: 10}}
                size={20}
                color="#2059B7"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>
            <Text
              style={{
                color: '#2059B7',
                fontFamily: 'Poppins',
                fontSize: 15,
                fontWeight: 400,
                marginBottom: 20,
              }}>
              Forget Password?
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#2F2F2F',
                fontFamily: 'Poppins',
                fontSize: 15,
                fontWeight: 300,
                marginBottom: 20,
                marginTop: 20,
              }}>
              Or via social media
            </Text>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Image
                source={require('../assets/google.png')}
                style={{width: 26, height: 26}}
              />
              <Image
                source={require('../assets/facebook.png')}
                style={{width: 26, height: 26}}
              />
            </View>
            <View style={{marginTop: 40}}>
              <Text
                style={{
                  color: '#9E9E9E',
                  fontFamily: 'Poppins',
                  fontSize: 15,
                  fontWeight: 300,
                }}>
                Don’t have an account?{' '}
                <Text
                  style={{
                    color: '#2F2F2F',
                    fontFamily: 'Poppins',
                    fontSize: 15,
                    fontWeight: 300,
                  }}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  dropdown: {
    flex: 1,
    marginTop: 5,
    alignContent: 'flex-end',
    alignItems: 'stretch',
    width: 250,
    height: 170,
    backgroundColor: '#fff',
    fontSize: 12,
    borderRadius: 5,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 290,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#898989',
    backgroundColor: '#fff',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 290,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#898989',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: 290,
    color: '#2059B7',
  },
  button: {
    backgroundColor: '#2059B7',
    padding: 10,
    borderRadius: 58,
    width: 187,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins',
    fontSize: 15,
  },
});

export default Login;
