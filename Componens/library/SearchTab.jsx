import { StyleSheet, Text, View , Image ,ScrollView , Pressable ,FlatList , } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../hook/supabaseClient';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
import SearchBycontent from './searchBycontent';
import Searchbyname from './searchbyname';
import SearchByCatagory from './searchByCatagory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../styles/color';
import { BottomNavigation,  } from 'react-native-paper';
import SearchForUser from './searchForUser';
import SearchByChatBot from './searchByAIChatBot';





const SearchTab = ({search }) => {

    const [pressedButton, setPressedButton] = useState('Button 1');
    const handlePress = (buttonName) => {
    setPressedButton(buttonName);
    
  };

{/* 
  const renderComponent = () => {
    if (pressedButton === "Button 1") {
      return <Searchbyname key="searchbyname"  search={search} />
    } else if (pressedButton === "Button 2") {
        <SearchBycontent  key="searchbycontent"  search={search}/>
    } else {
      // Return default component or null
      return null;
    }
  };
*/} 

    return ( 
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        
        <View style={styles.container}>
      <Pressable
        onPress={() => handlePress('Button 1')}
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 1' && { color:colors.special},]}>بالأسم</Text>
        
        {pressedButton === "Button 1" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
        
      </Pressable>
      <Pressable
        onPress={() => handlePress('Button 2')}
    
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 2' && { color:colors.special},]}>بالمحتوى</Text>
        {pressedButton === "Button 2" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
      </Pressable>
      <Pressable
        onPress={() => handlePress('Button 3')}
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 3' && { color:colors.special},]}>بالتصنيف</Text>
        {pressedButton === "Button 3" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
      </Pressable>

      <Pressable
        onPress={() => handlePress('Button 4')}
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 4' && { color:colors.special},]}>كُتاب</Text>
        {pressedButton === "Button 4" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
      </Pressable>
      {/* <Pressable
        onPress={() => handlePress('Button 5')}
      >
        <Text style={[styles.buttonText , pressedButton === 'Button 5' && { color:colors.special},]}>ذكاء اصطناعي</Text>
        {pressedButton === "Button 5" && (
        <View style={{ backgroundColor: colors.special, height: 2, marginTop: 5 }}></View>
      )}
      </Pressable> */}
      
      </View>
         
         {/* {renderComponent()}*/} 

         {pressedButton === "Button 1" && (
        <>
          <Searchbyname key="searchbyname"  search={search} />
        </>
      )}
      {pressedButton === "Button 2" && (
        <>
          <SearchBycontent  key="searchbycontent"  search={search}/>
        </>
      )}
      {pressedButton === "Button 3" && (
        <>
          <SearchByCatagory  key="searchbyCatagory"  search={search}/>
        </>
      )}
      {pressedButton === "Button 4" && (
        <>
          <SearchForUser key="searchForUser"  search={search}/>
        </>
      )}
      {pressedButton === "Button 5" && (
        <>
          {/* <SearchByChatBot/> */}
        </>
      )}
     
      </View>
   </ScrollView>
     

        
      );

      
    };
  
    const styles = StyleSheet.create({
        container: {
           
           height:20,
           flexDirection:'row',
           justifyContent:'space-between',
           marginTop:7,
           marginBottom:7,
           paddingHorizontal:15,
           alignItems:'center',
           paddingRight:10,
           paddingLeft:10,
          
           
            
          },
          input: {
            height: 40,
            marginBottom: 20,
            backgroundColor: 'white',
            paddingHorizontal: 10,
          },
          container2: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#121212',
            
          },

          buttonText: {
            color:colors.sub_text,
          },
        
      });
  export default SearchTab;