import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Vibration , Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect , useRef  } from 'react';
import colors from '../../../styles/color';
import HeaderBar from '../../../Componens/public/headerBar';
import { useAuth } from '@clerk/clerk-expo';
import { checkAndInsertlater } from '../../../Actions/books';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { GetUserDataByClerk } from '../../../Actions/user';
import CheckBoxList from '../../../Componens/library/CheckBoxList';




export default function ReviewRequest() {

  
  const route = useRoute();
  const navigation = useNavigation();
  
  const { request } = route.params;


  const [book, setBook] = useState([]);
  const {userId } = useAuth();

  const sheetRef = useRef(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [URLImage, setURLImage] = useState('');
  const [owner, setOwner] = useState('');
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [BookURL, setBookURL] = useState('');
  const [category, setCategory] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchbooklist();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleCheckbox = () => {
    // Empty function
  };




  return (

    

    
    
    <View style={styles.container}  >


  
        <HeaderBar  MainText={"صفحة الكتاب"}/>
        {/* <Spinner visible={loading} /> */}

        
     
      <ImageBackground source={{uri: request.imageURL}} style={{height:'auto' , backgroundColor:'black',flexDirection: 'row',borderRadius:10}}>
        {/* Transparent black layer */}
        

       
      <View style={styles.overlay} />

        

         <View style={{ flex:1,}}>




         <View style={{ marginTop: 10, marginLeft: 15 ,  }}>
         <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
             غلاف الكتاب
          </Text>
         <Pressable  style={styles.pickimage}>
              {request.imageURL ? (
                <Image source={{ uri: request.imageURL }} style={styles.selectedImage} />
              ) : (
                <Ionicons name="image" size={30} color={colors.special} />
              )}
        </Pressable>
        {/* <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              800×530
       </Text> */}
            <View style={{flexDirection:'row-reverse' , alignSelf:'center'}}>
              <Text style={{color:colors.special , alignSelf:'center' , marginVertical:10 , fontWeight:'bold' }}>
                الحالة:
               </Text>
                {request.underreview ? (
                <View style={[styles.state ,{backgroundColor:'#F6E731'} ]}>
                  <Text style={styles.underReview}>تحت المراجعة</Text>
                </View>
              ) : request.accepted ? (
                <View style={[styles.state ,{backgroundColor:'#8fce00'} ]}>
                  <Text style={styles.accepted}>مقبول</Text>
                </View>
              ) : (
                <View style={[styles.state ,{backgroundColor:'#f44336'} ]}>
                  <Text style={styles.rejected}>مرفوض</Text>
                </View>
              )}
            </View>
              
             
            

      
    </View>
               
          
         </View>

         </ImageBackground>

  


         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}style={{ flex: 1}}>
         <View style={styles.DrawerDivider} />

         <ScrollView scrollEnabled={true}>

        


         <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              اسم الكتاب
       </Text>


         <TextInput
        style={styles.TextInput}
        multiline
        placeholder={request.title}
        placeholderTextColor={colors.sub_text}
        color={colors.sub_text} 
        editable={false}
      />
       <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              اسم الكاتب
       </Text>


         <TextInput
        style={styles.TextInput}
        multiline
        placeholder={request.author}
        placeholderTextColor={colors.sub_text}
        color={'white'} 
        editable={false}
      />
      
      <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              وصف الكتاب
       </Text>


         <TextInput
        style={styles.TextInputDescreption}
        multiline
        placeholder={request.description}
        placeholderTextColor={colors.sub_text}
        color={'white'} 
        numberOfLines={15}
        editable={false}
        
      />

<Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              محتوى الكتاب
       </Text>
       <Text style={{ alignSelf: 'center', marginVertical: 1, fontSize: 10, color: colors.sub_text, fontWeight: 'bold' }}>
              كلمات دلالية لمحتوى الكتاب لتسهيل البحث عنه
              
       </Text>
       <Text style={{ alignSelf: 'center', marginVertical: 1, fontSize: 10, color: colors.sub_text, fontWeight: 'bold' }}>
       مثل: # سرقة ، #لص ، #جريمة
              
       </Text>  

       <ScrollView
        style={styles.chipsScrollContainer}
        contentContainerStyle={styles.chipsContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {request.tags?.map((tag, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>#{tag}</Text>
          </View>
        ))}
      </ScrollView>

       
       <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
        رابط شراء الكتاب
       </Text>
         <TextInput
        style={styles.TextInput}
        multiline
        placeholder={request.bookURL}
        placeholderTextColor={colors.sub_text}
        color={colors.sub_text} 
        editable={false}
        numberOfLines={3}
        height={'auto'}
        maxHeight={40}
      />

<Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
        التصنيف
       </Text>


      <ScrollView horizontal={true} style={styles.scrollView}>
        <CheckBoxList checkedItems={request.category || []} toggleCheckbox={toggleCheckbox} />
      </ScrollView>
  

     
      

    
      
   
      </ScrollView>
      </KeyboardAvoidingView>
      
         
      <StatusBar style="auto" />

      <BottomSheet containerHeight={450} style={{backgroundColor:colors.Dark_secondary}} ref={sheetRef}>
          
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

  state:{

    alignSelf:'center',
    borderRadius:30,marginHorizontal:5,
    
    
    
  },


  underReview: {
    fontSize: 12,
    color: 'black',
    marginHorizontal:10 , 
    fontWeight: 'bold',

  },

  accepted: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal:10 , 
  },
  rejected: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal:10 , 
    alignSelf:'flex-end',
    marginRight:10,
  },
  explan: {
    fontSize: 12,
    color: '#aaa',
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    marginTop:20,
    
    
  },
  pickimage: {
    height:200,
    width:133,
    backgroundColor:'#e0e0e0',
    alignSelf:'center',
   
    
    alignItems:'center',
    justifyContent:'center'
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    
    
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
    alignSelf:'center',
    backgroundColor:'#383838' ,
     height:30,
      width:300,
      borderRadius:10,
      textAlign:"center",
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,

      justifyContent:'center'

  },

  chipsInput:{
    alignSelf:'center',
    backgroundColor:'#383838' ,
     height:30,
      width:300,
      borderRadius:10,
      textAlign:"center",
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,

      justifyContent:'center'

  },
  TextInputDescreption:{
    alignSelf:'center',
    backgroundColor:'#383838' ,
     height:100,
      width:300,
      borderRadius:10,
      textAlign:"center",
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,
      maxHeight:300,
     

      justifyContent:'center'

  },
  DrawerDivider:{
    height: 1, width: '90%', backgroundColor:colors.Dark_secondary,   marginTop:5, alignSelf:'center'

   },

   text: {
    alignSelf: 'center',
    marginVertical: 1,
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold'
  },
  textInput: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginVertical: 10
  },
  chipsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf:'center',
     height:30,
      width:300,
      borderRadius:10,
      textAlign:"center",
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,

      justifyContent:'center'
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.special,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal:3,

  },
  chipText: {
    color: 'white',
    marginRight: 5
  },
  removeText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5
  },
  chipsScrollContainer: {
    marginVertical: 10,
  },
  scrollView: {
    alignSelf:'center',
    backgroundColor:'#383838' ,
     height:30,
      width:300,
      borderRadius:10,
      textAlign:"center",
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginLeft:5,
      marginTop:5 ,

      
    
    
  },
});
