import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable ,FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar , Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {  ActivityIndicator } from 'react-native';
import { supabase } from '../../hook/supabaseClient';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';


const SearchBycontent = ({search}) => {
    const [fetchError, setFetchError] = useState(null);
    const [bookList, setBookList] = useState(null);
    const navigation = useNavigation();


    const handlePress = (book_id) => {
      // Navigate to the "Book" screen with the book ID
      navigation.navigate('Book', { book_id });
    };
  
    useEffect(() => {
      const fetchbooklist = async () => {
        try {
          const { data, error } = await supabase
            .from('Books')
            .select('*')
            .contains('tags', [search]);
            
  
          if (error) {
            setFetchError('Could not fetch users');
            setBookList(null);
          } else {
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            setBookList(sortedData);
            setLoading(false);
            setFetchError(null);
            //console.log(data);
          }
        } catch (error) {
          
          setFetchError('An error occurred while fetching users');
        }
      };
  
      fetchbooklist();
    }, [search]);
  
    const renderItem = ({ item }) => (
      <Pressable onPress={() => handlePress(item.id)}>
        <View style={{ backgroundColor: '#212121', height: 150, borderRadius: 8, marginTop: 3 }}>
          <View style={{ flexDirection: 'row', direction: 'rtl' }}>
            <View>
              <Image
               style={styles.bookimage}
                source={{ uri: item.URLImage }} 
              />
            </View>
            <View style={{flex: 1, marginLeft: 3, marginTop: 10, alignItems: 'center' }}>
              <Text style={styles.nametext}>{item.name}</Text>
              <Text style={styles.authortext}>{item.author}</Text>
                    <View style={{flexDirection:'row' , alignSelf:'flex-start' , marginTop:10,}}>
                        <StarRating disabled={true} maxStars={1} rating={1} starSize={15} fullStarColor={'rgba(255, 123, 0 , 0.5)'} starStyle={{marginRight:3,}} />
                  <Text style={{color:'rgba(255, 123, 0 , 0.5)'}}>{item.rate}</Text>
                    </View>
              
              <Text numberOfLines={3} style={styles.destext}>{item.description}</Text>
            </View>
          </View>
        </View>
       </Pressable>
      );
    
      return (
       <View>
        <View style={{alignItems:'center'}}>
          <Text style={{color:'white'}}>البحث بالمحتوى</Text>
        </View>
        <FlatList
          data={bookList}
          keyExtractor={(item) => item.id.toString()} // Replace 'id' with the actual property name for the unique key
          renderItem={renderItem}
          scrollEnabled={false}
        />
        </View>
      );
    };
  
    const styles = StyleSheet.create({
        bookimage: {
            height: 130, width: 90, marginTop: 10, marginLeft: 5 , resizeMode:'cover',
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
  export default SearchBycontent;