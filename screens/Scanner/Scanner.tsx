import React from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import useScanner from '../../hooks/use-scanner';
import Table from '../../tables/dataTable';
import styles from './styles';

const Scanner = React.memo(() => {
  const {
    tableData,
    selectedButton,
    handleButtonPress,
    device,
    scanned,
    codeScanner,
    flashLightOn,
    toggleFlashLight,
    lastScannedNumber,
    handleUploadAll,
    loading
  } = useScanner();

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>
        {tableData.length.toString().padStart(3, '0')}
      </Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>
          UM |{' '}
          {tableData
            .filter((item: { condition: string; }) => item.condition === 'Usable')
            .length.toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.count}>
          DM |{' '}
          {tableData
            .filter((item: { condition: string; }) => item.condition === 'Defected')
            .length.toString()
            .padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: `${
              selectedButton === 'Usable' ? '#1AD470' : '#848482'
            }`,
          }}
          onPress={() => handleButtonPress('Usable')}>
          <Text style={styles.buttonText}>USABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: `${
              selectedButton === 'Defected' ? '#F24008' : '#848482'
            }`,
          }}
          onPress={() => handleButtonPress('Defected')}>
          <Text style={styles.buttonText}>DEFECTED</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {device == null ? (
            <Text>No Device found</Text>
          ) : (
            <>
              <View style={styles.overlay} />
              <Camera
                style={styles.camera}
                device={device}
                isActive={!scanned}
                codeScanner={codeScanner}
                torch={flashLightOn}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleFlashLight}>
                <Icon
                  name="flash"
                  size={24}
                  color={flashLightOn === 'off' ? '#fff' : '#FFFF80'}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <Text style={styles.lastScannedNumber}>
        Last scanned Asset No :{' '}
        <Text style={{fontWeight: '700', fontSize: 15}}>
          {lastScannedNumber}
        </Text>
      </Text>
      <Table data={tableData} />
      <Button
        onPress={() => handleUploadAll()}
        title={loading ? 'Uploading...' : 'Upload All'}
        color="#2059B7"
        disabled={loading}
      />
      {loading && <ActivityIndicator color="blue" />}
    </View>
  );
});

export default Scanner;
