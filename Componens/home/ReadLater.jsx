import React, { useState, useEffect } from 'react';
import { View, Vibration , ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable , ImageBackground } from 'react-native';
import Book from '../../app/library/Book'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../../hook/supabaseClient';
import colors from '../../styles/color';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import MyLoader from '../public/skeletons/book-skeleton';
import { deletelater } from '../../Actions/books';



const Readlaetr = (user_Id) => {
  const [fetchError, setFetchError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [imagecover , setImagecover] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {userId } = useAuth();
  // const [otheruserid , setOtheruserid] = useState(null);
 
  

  

  // console.log("consst",userId);
  // console.log("props",otheruserid);

  useEffect(() => {
    const fetchbooklist = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Readlater')
          .select('*')
          .eq('user_id', userId)

        if (error) {
          setFetchError('Could not fetch books');
          setBookList([]);

          setLoading(false);
        } else {
            
          setBookList(data);
         
          setLoading(false);
          setFetchError(null);
          //  console.log("--Book List data :",bookList);
        }
      } catch (error) {
        setFetchError('Check your internet connection');
        setLoading(false);
      }
    };

    const fetchrandomcover = async () => {
      
      try{
        const { data: cover , error:er } = await supabase
        .from('Books')
        .select('URLImage')
       
        const randomIndex = Math.floor(Math.random() * cover.length);
          // Get the random row
        const randomRow = cover[randomIndex];

        const imagecover = randomRow.URLImage;
       

        if (er) {
          console.error('Error fetching data:', er.message);
        } else {
          // console.log('Random row s:', imagecover);
          setImagecover(imagecover);

        }
      }catch(error){
          
        
      }



    };




    // setOtheruserid(user_Id);
    fetchbooklist();
    fetchrandomcover();

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

  const goToLiabrary = () => {
    // Navigate to the "Book" screen with the book ID
    navigation.navigate('Library');
    
  };

  // const handleLongPress = (supabase, clerk_id, bookid) => {
  //   // Vibrate the device
  //   Vibration.vibrate();
  //   deletelater(supabase, clerk_id, bookid);

  // }; 

  return (
    <ScrollView style={styles.book} horizontal={true}>
  {/* Your initial component */}
 
    <Pressable onPress={() => goToLiabrary()}  >
      <ImageBackground source={{uri: imagecover}} style={{height: 150, width: 110, justifyContent: "center", alignItems: 'center'}}>
        <View style={styles.overlay} />
        <Text style={{ color: colors.sub_text }}>أضف  كتاب</Text>
        <Ionicons name="duplicate-outline" size={26} color={colors.sub_text} style={{ paddingTop: 5 }} />
      </ImageBackground>
    </Pressable>

  

 



  {/* <MyLoader   /> */}

  {/* Check other conditions and render accordingly */}
  {loading ? (
    <View style={{ backgroundColor: colors.Dark_secondary, height: 150, width: 110, justifyContent: "center", alignItems: 'center'}}>
      <Spinner visible={loading} />
    </View>
  ) : fetchError ? (
    <View style={{ backgroundColor: colors.Dark_secondary, height: 150, width: 110, justifyContent: "center", alignItems: 'center'}}>
      <Text style={{ color: 'white' }}>{fetchError}</Text>
    </View>
  ) : displayBooks && displayBooks.length > 0 ? (
    // Your mapped components
    displayBooks.map((book) => (
      <View key={book.id}>
        <Pressable    onPress={() => handlePress(book.book_id)}>
          <View style={styles.userContainer}>
            {book.image ? (
              <Image
                source={{ uri: book.image }}
                style={styles.userImage}
                resizeMode="cover"
              />
            ) : (
              <View style={{ backgroundColor: colors.Dark_secondary, height: 150, width: 110, justifyContent: "center", alignItems: 'center'}}>
                <Text style={{ color: 'white' }}>No Image Available</Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    ))
  ) : 
  
  <ImageBackground source={{uri: imagecover}} style={{height: 150, width: 110, justifyContent: "center", alignItems: 'center'}}>
  <View style={styles.overlay} />
  <Text style={{ color: colors.sub_text }}> لا يوجد كتاب </Text>
</ImageBackground>
  
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust the alpha value (0.5 for 50% transparency)
  },
});

export default Readlaetr;
