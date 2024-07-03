import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import Book from '../../app/library/Book'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../../hook/supabaseClient';
import colors from '../../styles/color';
import { Skeleton } from 'moti/skeleton';

const Booklist = ({data}) => {
  const [fetchError, setFetchError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

 

  useEffect(() => {
    const fetchbooklist = async () => {
       setBookList(data);
      //  setLoading(false);
    };

    fetchbooklist();
  }, [data]);

  const handlePress = (book_id) => {
    navigation.navigate('Book', { book_id });
  };

  return (
    <ScrollView style={styles.book} horizontal={true}>
      {loading ? (
        <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:'100%', justifyContent:"center" , alignItems:'center' , flexDirection:'row'}}>
            <Skeleton colorMode={'dark'} width={110} height={150}  radius={0} />
            <Skeleton colorMode={'dark'} width={110} height={150}  radius={0} />
            <Skeleton colorMode={'dark'} width={110} height={150}  radius={0} />
            <Skeleton colorMode={'dark'} width={110} height={150}  radius={0}/>
            
      </View>
        


      ) : fetchError ? (
        <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:110, justifyContent:"center" , alignItems:'center'}}>
                <Text style={{ color: 'white' }}>Check your internet connection</Text>
        </View>
      ) : (
        bookList?.map((book) => (
          <Pressable key={book.id} onPress={() => handlePress(book.id)} >
            <View style={styles.userContainer}>
              {book.URLImage ? (
                <Image
                  source={{ uri: book.URLImage }}
                  style={styles.userImage}
                  resizeMode="cover"
                />
              ) : (
                 
                <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:110, justifyContent:"center" , alignItems:'center'}}>
                <Text style={{ color: 'white' }}>No Image Available</Text>
              </View>
              )}
              
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  userContainer: {
    marginLeft: 3,
  },
  userImage: {
    width: 110,
    height: 150,
    borderRadius: 0,
    resizeMode: 'contain'
  },
  book:{
    flexDirection: 'row',
   backgroundColor:"#191919",
   height:150,

  },
});

export default Booklist;
