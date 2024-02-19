import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      width: 200,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginLeft: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#898989',
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    button: {
      height: 40,
      width: '80%',
      backgroundColor: '#2059B7',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    buttonYes: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      width: 80,
      marginTop: 20,
    },
    buttonNo: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      width: 80,
      marginTop: 20,
    },
    dropdown: {
      flex: 1,
      marginTop: 5,
      alignContent: 'flex-end',
      alignItems: 'stretch',
      width: 200,
      height: 170,
      backgroundColor: '#fff',
      fontSize: 12,
      borderRadius: 5,
    },
    dropdownIcon: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: [{translateY: -10}],
    },
  });

  export default styles;