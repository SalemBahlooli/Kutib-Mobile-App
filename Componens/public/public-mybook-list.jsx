import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import Book from '../../app/library/Book'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../../hook/supabaseClient';
import colors from '../../styles/color';

const MyBookList = ({ user_id }) => {
  const [fetchError, setFetchError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBookList = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Books')
          .select('*')
          .eq('owner', user_id);

        if (error) {
          setFetchError('Could not fetch books');
          setBookList([]);
        } else {
          setBookList(data);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBookList();
  }, [user_id]);

  const handlePress = (book_id) => {
    // Navigate to the "Book" screen with the book ID
    navigation.navigate('Book', { book_id });
  };

  return (
    <ScrollView style={styles.book} horizontal={true}>
      {
  loading ? (
    <View style={styles.userContainer}>
      <Spinner visible={true} />
    </View>
  ) : fetchError ? (
    <View style={styles.userContainer}>
      <Text style={styles.errorText}>Check your internet connection</Text>
    </View>
  ) : bookList.length === 0 ? (
    <View style={{ backgroundColor:colors.Dark_secondary, height:150 , width:110, justifyContent:"center" , alignItems:'center' , borderColor:colors.Dark_primary , borderWidth:1, }}>
                <Text style={{ color: 'white' }}>لايوجد كتب مؤلفة</Text>
              </View>
  ) : (
    bookList.map((book) => (
      <Pressable key={book.id} onPress={() => handlePress(book.id)}>
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
  )
}

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
    width: 99,
    height: 150,
    borderRadius: 0,
    resizeMode: 'cover'
  },
  book:{
    flexDirection: 'row',
   backgroundColor:"#191919",
   height:150,

  },
});

export default MyBookList;
