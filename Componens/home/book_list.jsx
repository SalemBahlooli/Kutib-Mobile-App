import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import Book from '../../app/library/Book'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../../hook/supabaseClient';
import colors from '../../styles/color';

const Book_list = () => {
  const [fetchError, setFetchError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

 

  useEffect(() => {
    const fetchbooklist = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Books')
          .select('id , URLImage');

        if (error) {
          setFetchError('Could not fetch books');
          setBookList([]);
          setLoading(false);
        } else {
          setBookList(data);
          
          setLoading(false);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching books');
        setLoading(false);
      }
    };

    fetchbooklist();
  }, []);

  // Shuffle the bookList array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Display a maximum of 15 books
  const shuffledBooks = shuffleArray(bookList);
  const displayBooks = shuffledBooks.slice(0, 15);

  const handlePress = (book_id) => {
    // Navigate to the "Book" screen with the book ID
    navigation.navigate('Book', { book_id });
  };

  return (
    <ScrollView style={styles.book} horizontal={true}>
      {loading ? (
        <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:110, justifyContent:"center" , alignItems:'center'}}>
            <Spinner visible={loading} />
      </View>
        


      ) : fetchError ? (
        <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:110, justifyContent:"center" , alignItems:'center'}}>
                <Text style={{ color: 'white' }}>Check your internet connection</Text>
        </View>
      ) : (
        displayBooks.map((book) => (
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

export default Book_list;
