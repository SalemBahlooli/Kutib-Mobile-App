// OfflineNotice.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/color';
import { Construction } from 'lucide-react-native';

const UnderMaintenance = () => {
  return (
    <View style={styles.container}>
        {/* <Text style={styles.textMain}> صيانة </Text> */}

        <Construction size={130}  color={colors.special}/>

      <Text style={styles.text}>التطبيق تحت الصيانة</Text>
      <Text style={styles.textsub}> 
      يؤسفنا إبلاغكم بأن التطبيق حاليًا خارج الخدمة بسبب أعمال الصيانة الجارية. نحن نبذل قصارى جهدنا لاستعادة الخدمة في أقرب وقت ممكن. شكرًا لتفهمكم وصبركم خلال هذه الفترة. 


      </Text>
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

export default UnderMaintenance;
