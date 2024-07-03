
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable , RefreshControl , SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar ,Icon, MD3Colors , } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/color';
import { useFonts} from 'expo-font';
import * as Font from 'expo-font';





const HeaderBar = ({MainText , LeftIcon , navigateTo }) => {
    const navigation = useNavigation();
    

    // const [fontsLoaded, fontError] = useFonts({
    //   'hand': require('../../assets/fonts/Handjet.ttf'),
     
     
    // });
   


    const openDrawer = () => {
        navigation.openDrawer();
      };

    const navigate = () => {
       navigation.navigate(navigateTo);
      };
       
return(

  <SafeAreaView style={{backgroundColor:colors.special}}>
     <View style={styles.bar}>

    <View style={{flex:1 }}>
        <View style={{flex:1,  marginLeft:20  , justifyContent:'center' }} >
            <Pressable  onPress={navigate} >
                    <Ionicons name={LeftIcon} size={25} color={colors.Dark_secondary} />
            </Pressable>
        </View>
            
    </View>
    
    <View style={{flex:1 }}>
         <View style={{flex:1 , justifyContent:'center' ,alignItems:'center'  }}>
            <Text style={{color:'#fff', fontSize:23 }}>{MainText}</Text> 
         </View>
    </View>

    
    <View style={{flex:1 ,alignItems:'flex-end' }}>
        <View style={{flex:1 , marginRight:20 , justifyContent:'center'}}>
         <Pressable onPress={openDrawer} >
                <Ionicons name="menu" size={30} color={colors.Dark_secondary} />
        </Pressable>
            </View>
    </View>
        
        
  </View>
  </SafeAreaView>

   



    );

};

const styles = StyleSheet.create({
   
    bar: {
      width: '100%', // Full width
      height:60 ,
      backgroundColor:colors.special,
     // alignItems: 'center', // Center the text horizontally
      flexDirection: 'row',
      paddingTop:15,
      
     
    
    },
   
   
   
  });

export default HeaderBar;