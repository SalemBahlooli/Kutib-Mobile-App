// OfflineNotice.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/color';
import { Construction } from 'lucide-react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const CreatingAccount = () => {
  return (
    <View style={styles.container}>
        {/* <Text style={styles.textMain}> صيانة </Text> */}

        {/* <Construction size={130}  color={colors.special}/> */}

        <Spinner visible={true} color={colors.special} />

      <Text style={styles.text}> جاري انشاء حساب </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.Dark_primary,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:60,
  },
  textsub: {
    color: colors.sub_text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:40,
    marginHorizontal:30,
    textAlign:'center',
  },
  textMain: {
    color: colors.special,
    fontSize: 100,
    fontWeight: 'bold',
    marginTop:-200,
     
    alignContent:'center'

  },
});

export default CreatingAccount;
