import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Vibration , Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import { Avatar, FAB   } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { Plus , BookmarkPlus } from 'lucide-react-native';
import Comments from '../../Componens/bookpage/comments';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect , useRef  } from 'react';
import colors from '../../styles/color';
import HeaderBar from '../../Componens/public/headerBar';
import { CommentInput } from '../../Componens/bookpage/comment-input';
import { supabase } from '../../hook/supabaseClient';
import { CommentProvider, useCommentUpdate } from '../../Componens/bookpage/CommentContext';
import { useAuth } from '@clerk/clerk-expo';
import { checkAndInsertlater } from '../../Actions/books';
import BookMenu from '../../Componens/bookpage/book-menu';
import BottomSheet from '@devvie/bottom-sheet';
import { Editcomment } from '../../Componens/bookpage/edit-comment';





export default function Book() {

  
  const route = useRoute();
  const { book_id } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { triggerFetch } = useCommentUpdate();
  const [refreshing, setRefreshing] = useState(false);
  const [rating, setRating] = useState(0);
  const [textInputHeight, setTextInputHeight] = useState(40);
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId } = useAuth();
  const [isCommentAllow, setIsisCommentAllow] = useState(true);
  const [commentdata ,  setCommentdata] =  useState(null);



  const sheetRef = useRef(null);

  // Function to hide the component in the parent
  const CommentAllow = () => {
    setIsisCommentAllow(!isCommentAllow);
    
  };
  const getMycomment = (comment) => {
    setCommentdata(comment);
    
    
  };



  useEffect(() => {
    const fetchbooklist = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Books')
          .select('*')
          .eq('id', book_id)


        if (error) {
          // setFetchError('Could not fetch books');
          setBook(null);
          setLoading(false);
          console.log("error",error);
        } else {
          setBook(data[0]);
          
          
          setLoading(false);
          // setFetchError(null);
        }
      } catch (error) {
        // setFetchError('An error occurred while fetching books');
        setLoading(false);
        console.log("catch",error);
      }
    };

    fetchbooklist();
  }, [book_id]);

  if(!book_id){
    return(<View style={styles.container}>
      <View style={{alignItems:'center' , justifyContent:'center' , flex:1}}>
          <Text style={{color:colors.sub_text}}>
             لم يتم العثور على الكتاب      
        </Text>
      </View>
    </View>
    )
    
}

  const openBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const handlePress = () => {
    // Open the bookUrl in the device's default browser
    if (book.BookURL) {
      Linking.openURL(book.BookURL).catch((err) => console.error('Error opening URL:', err));
    } else {
      Alert.alert(
        'شراء الكتاب',
        'لايوجد رابط متوفر لهذا الكتاب',
        [
          {
            text: 'حسناً',
            style: 'cancel',
          },
          
        ],
        { cancelable: false }
      );
    }
    
  };


  
      const formattedTags = book.tags ? book.tags.map(tag => `#${tag}`).join(' ، ') : "";
      const formattedRate = typeof book.rate === 'number' ? book.rate.toFixed(1) : 'N/A';

 
 

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handlePressAllert = () => {
    // Open the bookUrl in the device's default browsers
    Alert.alert(
      'دعم الكاتب',
      'نأسف 😔، هذه الميزة غير متوفرة حالياً💔',
      [
        {
          text: 'حسناً',
          style: 'cancel',
        },
        
      ],
      { cancelable: false }
    );
  };
  const handleImageClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (

    

    
    
    <View style={styles.container}  >


  
        <HeaderBar  MainText={"صفحة الكتاب"}/>
        {/* <Spinner visible={loading} /> */}

        
     
      <ImageBackground source={{uri: book.URLImage,}} style={{height:250 , backgroundColor:'black',flexDirection: 'row',borderRadius:10,}} imageStyle={{resizeMode:'cover'}}>
        {/* Transparent black layer */}
        

       
      <View style={styles.overlay} />

         <View style={{flex:1, }}>

              
                 <Text style={{color:"white", fontSize:15,textAlign: 'center', alignItems:'center' , marginTop:20, fontSize:20,}}numberOfLines={2}> {book.name} </Text>
              
              
                 <Text style={{color:"#fff", textAlign: 'center', alignItems:'center' , fontSize:15, marginTop:10,}} numberOfLines={1}> الكاتب: {book.author} </Text>
                 <Text style={{color:"#fff", textAlign: 'center', alignItems:'center' , fontSize:15, marginTop:10,}} numberOfLines={1}> دار النشر: لايوجد </Text>
              
                 <View style={{flexDirection:'row' , padding:10, justifyContent:'center'}}>
                  <StarRating disabled={true} maxStars={1} rating={1} starSize={20} fullStarColor={colors.special} starStyle={{marginRight:3,}} />
                  <Text style={{color:colors.special}}>{formattedRate}</Text>
                 </View>
                 
             
             
                 <Text style={{color:"white", fontSize:10,textAlign: 'center', alignItems:'center' , }}> {formattedTags} </Text>
             
              <ScrollView style={{paddingTop:10}}>
                <Text style={{color:"white",  textAlign: 'center', alignItems:'center', fontSize:13}}  >{book.description}</Text>
              </ScrollView>
               
         </View>
          {/* Divider betwin info and book image  */}
         <View style={{ height: '90%', width: 1, backgroundColor: 'rgba(128, 128, 128, 0.5)' , marginTop:15, margin:1,}} />

         <View style={{ flex:1,}}>




         <View style={{ marginTop: 10, marginLeft: 15 }}>
      <Pressable onPress={handleImageClick} >
        <ImageBackground source={{uri: book.URLImage,}} style={{ height: 200, width: 133 }} imageStyle={{resizeMode:'cover'}}>
          {/* <Pressable  onPress={() =>handleLongPress(supabase , userId , book.id , book.URLImage )}style={{position:'absolute' , bottom:1, right:-15}}> */}
          <Pressable   onPress={openBottomSheet} style={{ alignItems:'flex-end'}}>
             <BookmarkPlus  color={colors.special}  size={30} style={{ marginRight:7 , marginTop:-2 }}/>
          </Pressable>

        </ImageBackground>
        {/* <Image style={{ height: 200, width: 160 , resizeMode: 'contain'  }} source={{ uri: book.URLImage }} /> */}
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
        onDismiss={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          
          <Image style={styles.modalImage} source={{ uri: book.URLImage }} />
          <Pressable  onPress={handleCloseModal}>
            <View style={{ backgroundColor:'gray', width:'30%' ,}} >
               <Text style={{color:'white' , }}>اغلاق</Text>
            </View>
           
          </Pressable>
        </View>
      </Modal>
    </View>
                <View style={{alignContent:'center' , flexDirection:'row'}} >
               <Pressable onPress={handlePressAllert}>
                  <View style={{flex:1, flexDirection:'row' ,paddingTop:10,marginLeft:10, }}>
                    
                      <Icon name="donate" size={16} color="white" />
                      <Text style={{color:'white', paddingLeft:2,}}>دعم الكاتب</Text>
                    
                      
                    
                    
                  
                  </View>
                  </Pressable>
             <Pressable onPress={handlePress}>
                  <View style={{  marginLeft:10 ,flexDirection:'row' , alignItems:'center', paddingTop:10,}}>
                    
                      <Ionicons name="book" size={16} color="white" />
                    <Text style={{color:'white' , paddingLeft:2,}} >شراء الكتاب</Text>
                    
                    
                    

                  </View>
                </Pressable>
                
                </View>
            
          
         </View>

         </ImageBackground>

  


         <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1  }}
  >
      

    
      
    <CommentProvider>
  
    <Comments bookid={book.id} isCommentAllow={CommentAllow} getMycomment={getMycomment}/>

    
    {isCommentAllow ? <CommentInput bookid={book.id}/> : <Editcomment data={commentdata} isCommentAllow={CommentAllow}/>}
  

  </CommentProvider>
     
      </KeyboardAvoidingView>
      
         
      <StatusBar style="auto" />
      {/* <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => GoAddBook()}
              /> */}

      <BottomSheet containerHeight={450} style={{backgroundColor:colors.Dark_secondary}} ref={sheetRef}>
          <BookMenu supabase={supabase} clerkId={userId} bookId={book.id} image={book.URLImage}/>
        </BottomSheet>


    </View>
   
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.Dark_primary,
    flex: 1,
    flexDirection: 'column',
    
  },

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
    color: 'white',
    justifyContent: 'center',

  },
  book:{
    flexDirection: 'row',
   backgroundColor:"#000",
   height:150,

  },
  
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius:20, 
    marginTop:10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    color:"white",
  },
  commentText: {
    fontSize: 16,
    color:'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the alpha value (0.5 for 50% transparency)
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    height: 700,
    width: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'relative',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Align content to the bottom
  },

  TextInput:{
    backgroundColor:'#383838' ,
     height:60,
      width:300,
      borderRadius:10,
      textAlign: 'right',
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,
      height: 'auto', // or use height: 'flex'
    maxHeight: 120, 

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:colors.special,
    
  },
});
