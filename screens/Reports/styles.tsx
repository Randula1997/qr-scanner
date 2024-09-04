/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      marginBottom: 90,
      height: '100%'
    },
    dateContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#CBF2FF',
      paddingHorizontal: 20,
      borderRadius: 47
    },
    title: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'center',
      marginTop:20
    },
    summaryTitle: {
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      marginLeft:'6%',
      marginTop:5
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 20,
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
      borderRadius: 20,
      backgroundColor: '#FBFFC9',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    productionCard: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius:20,
      backgroundColor: '#F9F9F9',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 14,
      marginTop:0,
    },
    titleSection:{
      backgroundColor:'#37B7FF',
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    },
    cardTitle:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 5
    },
    styleNo: {
      fontSize: 14,
      fontWeight: '700',
      fontFamily:'Lato-Black',
      color:'#fff'
    },
    textLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      color:'#fff',
    },
    summary: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginBottom:8
    },
    summaryItem: {
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center',
      width:'28%',
    },
    fontStyle:{
      fontFamily:'Roboto-Bold',
      fontSize:12,
      width: '45%',
    },
    summaryText:{
      color: 'black',
      fontFamily:'Roboto-Medium',
      fontSize: 8,
      fontWeight:'400',
    },
    summaryNumbers: {
      color: 'black',
      fontFamily:'Roboto-Black',
      fontSize: 16,
      fontWeight: '500',
    }
  });

  export default styles;