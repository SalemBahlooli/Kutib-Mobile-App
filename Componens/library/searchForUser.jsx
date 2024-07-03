import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable ,FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar , Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {  ActivityIndicator } from 'react-native';
import { supabase } from '../../hook/supabaseClient';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../styles/color';

import UserImage from '../bookpage/userprofileImage';
import UserName from '../bookpage/username';


const SearchForUser = ({search}) => {
    const [fetchError, setFetchError] = useState(null);
    const [bookList, setBookList] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);


    const GoProfile = (userId) => {
      navigation.navigate("Profile", { userId });
     };
  
    useEffect(() => {
      const fetchbooklist = async () => {
        try {
          // setLoading(true);
          if (search) {
            // If search string is provided, perform ilike search
            ({ data, error } = await supabase
              .from('profiles')
              .select('*')
              .ilike('name', `%${search}%`));
          } 
            
  
          if (error) {
            setFetchError('Could not fetch users');
            setBookList(null);
            setLoading(false);
          } else {
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            setBookList(sortedData);
            setLoading(false);
            setFetchError(null);
            console.log(sortedData);
            setLoading(false);
          }
        } catch (error) {
          
          setFetchError('An error occurred while fetching users');
          setLoading(false);
        }
      };
  
      fetchbooklist();
    }, [search]);
  
    const renderItem = ({ item }) => (
      <Pressable onPress={() => GoProfile(item.clerk_id)}>
        <View style={{ backgroundColor: colors.Dark_secondary, height: 100, borderRadius: 8, marginTop: 3 }}>
          <View style={{ flexDirection: 'row', direction: 'rtl' }}>
            <View style={{height:500,}}>

            <UserImage clerk_id={item.clerk_id} style={{height:80 , width:80, marginTop:10, }}/>

              
            </View>
            <View style={{flex: 1, marginLeft: 3, marginTop: 10 }}>

                <UserName clerk_id={item.clerk_id} lefticon={true}  fontSize={20} style={{ marginTop: 5, fontSize: 20 , color:'white' , alignSelf:"flex-start" }}/>
              {/* <Text style={styles.nametext}>{item.name}</Text> */}
              <Text style={styles.authortext}>{item.about}</Text>
                    
              <Text numberOfLines={3} style={styles.destext}>{item.description}</Text>
            </View>
          </View>
        </View>
       </Pressable>
      );
    
      return (
       <View>
        <View style={{alignItems:'center'}}>
          <Text style={{color:'white'}}>البحث بألاسم</Text>
        </View>
        <Spinner visible={loading} />
        {bookList.length > 0 && (
          <FlatList
          data={bookList}
          keyExtractor={(item) => item?.id?.toString()} // Use optional chaining to safely access the id property
          renderItem={renderItem}
          scrollEnabled={false}
        />
)}
        </View>
      );
    };
  
    const styles = StyleSheet.create({
        bookimage: {
            height: 60, width: 60, marginTop: 10, marginLeft: 5 , resizeMode:'cover',
        },
        nametext:{
            marginTop: 5, fontSize: 20 , color:'white' , alignSelf:"flex-start",marginLeft:10
        },
        destext:{
            marginTop: 5, fontSize: 20 , color:'#bfbfbf' , textAlign: 'center', alignItems:'center', fontSize:13, marginBottom:5,
        },
        authortext:{
            marginTop: 5, fontSize: 15 , color:'#bfbfbf' , alignSelf:"flex-start",marginLeft:10
        },
        
      });
  export default SearchForUser;