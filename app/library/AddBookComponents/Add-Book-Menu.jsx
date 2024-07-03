import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable  , RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,  useEffect } from 'react';
import HeaderBar from '../../../Componens/public/headerBar';
import colors from '../../../styles/color';
import UnderReview from './underReview';
import { useAuth } from '@clerk/clerk-expo';
import { supabase } from '../../../hook/supabaseClient';
import { getDoneReviewBooks, getUnderReviewBooks } from '../../../Actions/review-books';
import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';







export default function AddBookMenu() {

  const navigation = useNavigation();
  const [pressedButton, setPressedButton] = useState('Button 2');
  const {userId } = useAuth();
  const [underReview, setUnderReview] = useState(null);
  const [doneReview, setDoneReview] = useState(null);
  const [refreshing, setRefreshing] = useState(false);



  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
    
  };

 
 const fetchData = async () => { 
      const result = await getUnderReviewBooks(userId);
      setUnderReview(result.data);
      
      const result2 = await getDoneReviewBooks(userId);
      setDoneReview(result2.data);
      
      
    };

  useEffect(() => {
    

    fetchData();
  }, [userId]);

  const onRefresh = () => {
    fetchData();
};

  const GoAddBook = () => {
    navigation.navigate("AddBook");
    
    
   };
  

  
  return (

     
    <View style={{flex:1}} >
      
      <HeaderBar  MainText={"اضافة كتاب"}/>
         
        <View style={styles.container}>
      <Pressable
        onPress={() => handlePress('Button 1')}
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 1' && { color:colors.special},]}>تمت المراجعة</Text>
        
        {pressedButton === "Button 1" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
        
      </Pressable>
      <Pressable
        onPress={() => handlePress('Button 2')}
    
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 2' && { color:colors.special},]}>تحت المراجعة</Text>
        {pressedButton === "Button 2" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
      </Pressable>
     
           
      </View>

      <View style={styles.container2}>
         {/* {renderComponent()}*/} 

         {pressedButton === "Button 1" && (
        <>
           <UnderReview data={doneReview}/>
          
        </>
      )}
      {pressedButton === "Button 2" && (
        <>
           <UnderReview data={underReview}/>
        </>
      )}

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => GoAddBook()}
              />
      </View>
         
        
      
     
    
       

     
       
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  bar: {
    width: '100%', // Full width
    height:100 ,
    backgroundColor: '#FF5733',
    alignItems: 'center', // Center the text horizontally
    // justifyContent: 'center', // Center the text vertically
    //paddingVertical: 10,
    flexDirection: 'row',
    //paddingHorizontal:100,
    //paddingLeft:35,
    paddingTop:40,
    paddingStart:20,
  },
  texts:{
    color: '#fff',
    justifyContent: 'center',

  },
  dividor:{
    backgroundColor:'#5B5B5B',
    height:25,
    justifyContent: 'center',
    alignItems:'center',


  },
  container: { 
    height:40,
    flexDirection:'row',
    justifyContent:'space-around',
    
    paddingHorizontal:15,
    alignItems:'center',
    paddingRight:10,
    paddingLeft:10,
    backgroundColor:colors.Dark_primary,
   
    
     
   },
   container2: {
     flex:1,
     justifyContent: 'center',
    
     backgroundColor: colors.Dark_secondary,
     
   },

   buttonText: {
     color:colors.sub_text,
   },
   fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:colors.special,
    
  },
});