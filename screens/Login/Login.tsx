import React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import SelectDropdown from 'react-native-select-dropdown';
import SyncStorage from 'sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import useLogin from '../../hooks/use-login';
import styles from './styles';

type RootStackParamList = {
  ScannerHome: any;
  Home: any;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Login = React.memo(({navigation}: Props) => {

  const {
    loading,
    factoryNames,
    setFactoryCode,
    ids,
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  } = useLogin({navigation});

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
            <FastImage
              source={require('../../assets/images/login-cover.jpeg')}
              style={{
                width: 270,
                height: 270,
                flexShrink: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode={FastImage.resizeMode.contain}
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
                source={require('../../assets/images/google.png')}
                style={{width: 26, height: 26}}
              />
              <Image
                source={require('../../assets/images/facebook.png')}
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
});

export default Login;
