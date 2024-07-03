import Toast from 'react-native-toast-message';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/color';

// Define custom toast types
 export const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, {  }]}>
        <View style={[styles.banner , {backgroundColor:'green',}]}/>
        <View>
            <Text style={[styles.toastText, styles.text1]}>{text1}</Text>
             {text2 && <Text style={[styles.toastText, styles.text2]}>{text2}</Text>}
        </View>
     
    </View>
  ),


  error: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, { }]}>
     <View style={[styles.banner , {backgroundColor:'red',}]}/>

     <View>
         <Text style={[styles.toastText, styles.text1]}>{text1}</Text>
      {text2 && <Text style={[styles.toastText, styles.text2]}>{text2}</Text>}
     </View>
     
    </View>
  ),


  infor: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, {}]}>
     <View style={[styles.banner , {backgroundColor:'yellow',}]}/>
     <View>
         <Text style={[styles.toastText, styles.text1]}>{text1}</Text>
      {text2 && <Text style={[styles.toastText, styles.text2]}>{text2}</Text>}
     </View>
     
    </View>
  ),
  // Add other custom toast types as needed
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor:colors.Dark_secondary,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'flex-start',
    width:'90%' ,
    flexDirection:'row-reverse',
    // borderColor:colors.special,
    // borderWidth:1, 
    // borderStyle:'dashed',
    
  },
  toastText: {
    color: 'white',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 14,
  },
  banner: {
    width:'2%', 
    marginHorizontal:10,
    borderRadius: 8,
    
  },
});

// // Register toastConfig in your component or App.js
// Toast.setConfig({
//   config: toastConfig,
// });
