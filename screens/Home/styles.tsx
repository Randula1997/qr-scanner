/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingHorizontal: 30,
    paddingTop: 30,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  wrapper: {
    flexDirection: 'row'
  },
  slider: {
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
    userName :{
      fontSize: 16,
      textAlign: 'right',
      backgroundColor: '#fff',
      color: 'black',
      marginRight: 20
    },
    welcome :{
      width: 250,
      paddingLeft: 30,
      fontFamily:'Allerta-Regular',
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'left',
      backgroundColor: '#fff',
      color: 'black',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems:'center',
      gap: 10,
      backgroundColor: '#fffff',
      padding: 15,
      borderRadius: 10,
      width: 150
    },
    buttonText: {
      color: '#fff'
    },
    card: {
      borderRadius: 18,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
      padding: 16,
      height:225
    },
    avatarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    dropdownContainer: {
      position: 'absolute',
      top: 40, // Adjust the top position according to your layout
      right: 0,
      backgroundColor: 'white',
      borderRadius: 5,
      elevation: 3, // Add shadow for Android
      shadowColor: '#000', // Add shadow for iOS
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    dropdownItem: {
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    stylesCard: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#e4ebfe',
      borderRadius: 7,
    },
    summaryCard: {
      alignItems: 'center', 
      height: 55, 
      justifyContent: 'center', 
      borderRadius: 8, 
      backgroundColor: '#FBFFC9', 
      gap: 5, 
    },
    upComingShipment:{
      fontSize: 13, 
      marginLeft:30, 
      marginTop:10, 
      paddingBottom:10, 
      fontWeight: '500', 
      fontFamily:'Roboto-Medium'
    },
    scanButton:{
      backgroundColor: '#1F9BB4', 
      borderRadius:  30, 
      width:  60, 
      height:  60, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    buttonContainer:{
      flex:  1,
      flexDirection: 'row',
      marginTop:-40, 
      marginBottom:8, 
      paddingHorizontal:20, 
      width:'100%', 
      justifyContent: 'space-between', 
      alignItems: 'center'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalItemText: {
      fontFamily:'Lato-Regular', 
      fontSize:10
    },
    modalIcon: {
      width:60, 
      height:60, 
      borderRadius:7, 
      justifyContent:'center', 
      alignItems:'center', 
      marginBottom:10
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    },
    absolute: {
      position: 'absolute',
      top:  0,
      left:  0,
      bottom:  0,
      right:  0,
    },
  });

  export default styles;