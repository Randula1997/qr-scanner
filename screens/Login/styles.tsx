/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

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

  export default styles;