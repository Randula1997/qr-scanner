/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    button: {
      marginHorizontal: 10,
      minWidth: 150,
      paddingLeft: 50,
      paddingRight: 50,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
    },
    countContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      backgroundColor: 'rgba(8, 130, 242, 0.12)',
      padding: 10,
      marginRight: 70,
      marginLeft: 70,
    },
    totalCount: {
      fontSize: 100,
      textAlign: 'center',
      color: '#0882F2',
      marginTop: 5,
    },
    count: {
      fontSize: 30,
      fontWeight: '700'
    },
    cameraContainer: {
      width: '60%',
      aspectRatio: 1,
      overflow: 'hidden',
      alignSelf:'center',
      position:'relative',
      marginTop: 5,
      marginBottom: 5
    },
    camera: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
    centerText: {
      fontSize: 18,
      color: 'white',
    },
    lastScannedNumber: {
      textAlign: 'center',
    },
    table: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#000',
      marginRight: 20,
      marginLeft: 40,
    },
    buttonStyle: {
      width:90,
      height:40,
      borderRadius:5,
      alignItems:'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:'center',
      justifyContent: 'center',
    },
    iconContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 2,
    },
  });

  export default styles;