/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white'
    },
    buttonContainer: {
      // flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30
    }
  });

  export default styles;