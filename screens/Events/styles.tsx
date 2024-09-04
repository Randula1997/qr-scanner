/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    textLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
      },
  });

  export default styles;