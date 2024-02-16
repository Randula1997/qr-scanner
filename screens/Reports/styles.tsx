/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      marginBottom: 90
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30
    },
    card: {
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    cardTitle:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    styleNo: {
      fontSize: 10,
      fontWeight: '700'
    },
    textLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    summaryText:{
      color: 'black',
      fontSize: 9,
      fontWeight:'400',
      width: '28%'
    },
    summaryNumbers: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
      width: '28%'
    }
  });

  export default styles;