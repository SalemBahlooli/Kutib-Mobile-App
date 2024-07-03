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
import { GetUserDataByClerk } from '../../../Actions/user';
import CheckBoxList from '../../../Componens/library/CheckBoxList';
import { ScrollText, Send } from 'lucide-react-native';
import { ActivityIndicator } from 'react-native-paper';
import { supabase } from '../../../hook/supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { uploadImageToSupabase } from '../../../Actions/books/uploadImageToSupabase';
import { SendBookUnderView } from '../../../Actions/review-books';
import Toast from 'react-native-toast-message';



export default function AddBook() {

  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [rating, setRating] = useState(0);
  const [textInputHeight, setTextInputHeight] = useState(40);
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId } = useAuth();
  const fallbackImage = 'https://i.ibb.co/GVHVq3c/Arte-da-Parete-Esclusiva-Stampe-su-Tela-Arredo-Moderno-per-la-Casa.jpg';
  const [imageUri, setImageUri] = useState(null);
  const [licenseUri, setLicenseUri] = useState(null);

  const sheetRef = useRef(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  // const [URLImage, setURLImage] = useState('');
  // const [license, setLicense] = useState('');
  const [owner, setOwner] = useState('');
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [BookURL, setBookURL] = useState('');
  const [category, setCategory] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);


  const toggleCheckbox = (item) => {
    setCheckedItems((prevState) =>
      prevState.includes(item)
        ? prevState.filter((checkedItem) => checkedItem !== item)
        : [...prevState, item]
    );
  };

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };



  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Permission to access media library denied');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [530, 800],
        quality: 1,
      });
  
      // console.log('ImagePicker Result:', result);
  
      if (!result.cancelled) {
        setImageUri(result.assets[0].uri);
        // setURLImage(result.assets[0].uri);
    
      } else {
        // console.log('Image selection cancelled');
      }
      
    } catch (error) {
      // console.error('Error picking image:', error);
    }
  };

  const handlelicensePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Permission to access media library denied');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
  
      // console.log('ImagePicker Result:', result);
  
      if (!result.cancelled ) {
        setLicenseUri(result.assets[0].uri);
        // console.log('Selected Image URI:', result.uri);
      } else {
        // console.log('Image selection cancelled');
      }
      
    } catch (error) {
      // console.error('Error picking image:', error);
    }
  };

  const uriToFile = async (uri, fileName) => {
    try {
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
      return {
        uri: fileUri,
        name: fileName,
        type: 'image/jpeg',
      };
    } catch (error) {
      console.error('Error converting URI to file:', error);
      return null;
    }
  };


  const AddRequest  = async () => {

    if (!areAllFieldsFilled()) {
      Toast.show({
        type: 'error',
        text1: 'لا يمكن تقديم الطلب',
        text2: 'يوجد لديك بيانات فارغة',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

          console.log('Some fields are empty');
          setLoading(false);
          return
        }


    try{
        setLoading(true);

          const sanitizedAuthor = author.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          const fileName = `${sanitizedAuthor}_${sanitizedTitle}_${Date.now()}.jpg`;
          const path1 = `public/Bookcover/${sanitizedAuthor}_${sanitizedTitle}_${Date.now()}.jpg`;
          const path2 = `public/license/${sanitizedAuthor}_${sanitizedTitle}_${Date.now()}.jpg`;

          const coverFile = await uriToFile(imageUri, fileName);
          const licenseFile = await uriToFile(licenseUri, fileName +'_license');

          

            
            console.log('Starting upload...');
            const { data:URLImage , error:error2 } = await uploadImageToSupabase(coverFile, path1);
            const { data:license , error:error1 } = await uploadImageToSupabase(licenseFile , path2);


            if (error1 || error2) {
                console.error('Error uploading image:', error);
                throw error1 || error2; 
            }
              
                await SendBookUnderView(
                  title,
                  author,
                  description,
                  URLImage, 
                  license,
                  owner,
                  tags,
                  BookURL,
                  checkedItems
                );
              
                  navigation.goBack();
            // const { data, error } = await supabase.storage
            // .from('book_cover')
            // .upload(path, file, {
            //   contentType: 'image/jpeg', // Ensure the correct content type
            // });

            // if (error) {
            //   console.error(error);
            // } else {
            //   console.log('Image uploaded:', data);
          
            //   // Get the public URL
            //   const { data, error: urlError } = supabase.storage.from('book_cover').getPublicUrl(path);
          
            //   if (urlError) {
            //     console.error(urlError);
            //   } else {
            //     console.log('Public URL:', data.publicUrl);
            //     setURLImage(data.publicUrl);
            //   }
            // }
              }catch(error){
                console.log(error);
              } finally{
                setLoading(false);
              }
   




    

    
   


  };



  const areAllFieldsFilled = () => {
    return (
      title.trim() !== '' &&
      author.trim() !== '' &&
      description.trim() !== '' &&
      imageUri.trim() !== '' &&
      licenseUri.trim() !== '' &&
      owner.trim() !== '' &&
      tags.length > 0 &&
      BookURL.trim() !== '' &&
      checkedItems.length > 0
    );
  };




  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data, error } = await GetUserDataByClerk(userId);
      if (error) {
        setError(error);
      } else {
        setAuthor(data[0].nickname); // Assuming the data contains only one user object
        setOwner(data[0].clerk_id); // Assuming the data contains only one user object
        
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  

  return (

    

    
    
    <View style={styles.container}  >


  
        <HeaderBar  MainText={"صفحة الكتاب"}/>
        {/* <Spinner visible={loading} /> */}

        
     
      <ImageBackground source={{uri: imageUri || fallbackImage }} style={{height:'auto' , backgroundColor:'black',flexDirection: 'row',borderRadius:10}}>
        {/* Transparent black layer */}
        

       
      <View style={styles.overlay} />

        

         <View style={{ flex:1,}}>




         <View style={{ marginTop: 10, marginLeft: 15 ,  }}>
         <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
             غلاف الكتاب
          </Text>
         <Pressable onPress={() =>handleImagePick()} style={styles.pickimage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
              ) : (
                <Ionicons name="image" size={30} color={'white'} />
              )}
        </Pressable>
        <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              800×530
       </Text>

      
    </View>
               
          
         </View>

         </ImageBackground>

  


         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}style={{ flex: 1}}>
         <View style={styles.DrawerDivider} />

         <ScrollView scrollEnabled={true}>

        


         <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold'  , marginTop:20}}>
              اسم الكتاب
       </Text>


         <TextInput
        style={styles.TextInput}
        multiline
        placeholderTextColor={colors.sub_text}
        color={colors.sub_text} 
        onChangeText={setTitle}
      />
       <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
              اسم الكاتب
       </Text>


         <TextInput
        style={styles.TextInput}
        multiline
        placeholder={author}
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
        placeholderTextColor={colors.sub_text}
        color={'white'} 
        numberOfLines={15}
        onChangeText={setDescription}
        
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
        {tags.map((tag, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>#{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(tag)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

       <TextInput
        style={styles.TextInput}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addTag}
        placeholder="اضف تاق"
        placeholderTextColor={colors.sub_text}
        color={colors.sub_text}
      />
       <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
        رابط شراء الكتاب
       </Text>


         <TextInput
        style={styles.TextInput}
        multiline
        placeholderTextColor={colors.sub_text}
        color={colors.sub_text} 
        onChangeText={setBookURL}
      />

        <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
        التصنيف
       </Text>


      <ScrollView horizontal={true} style={styles.scrollView}>
        <CheckBoxList checkedItems={checkedItems} toggleCheckbox={toggleCheckbox} />
      </ScrollView>

      <Text style={{ alignSelf: 'center', marginVertical: 5, fontSize: 15, color: colors.special, fontWeight: 'bold' }}>
            ترخيص
       </Text>
       <Text style={{ alignSelf: 'center', marginVertical: 1, fontSize: 10, color: colors.sub_text, fontWeight: 'bold' }}>
       للتأكيد على ملكيتك للكتاب، يلزم الحصول على ترخيص أو تصريح أو إجازة (أيًا كان مسماها) {"\n"} من الجهة الرسمية المختصة بذلك في بلدك مثل وزارة الإعلام أو ما يماثلها.
       </Text>

      <Pressable onPress={handlelicensePick} style={styles.license}>
              {licenseUri ? (
                <Image source={{ uri: licenseUri }} style={styles.selectedImage} />
              ) : (
                <ScrollText size={30} color={'white'} />
              )}
        </Pressable>


        <Pressable style={styles.button} onPress={() => AddRequest()} disabled={loading}>
             {loading ? (
                <ActivityIndicator animating={true} color={'white'} /> // Change icon and color when uploading
                ) : (
                  <View style={{flexDirection:'row'}}>
                    <Send  color={'white'} size={20}/>
                    <Text style={{color:'white' , marginHorizontal:10 , fontWeight:'bold' }}>
                      ارسال
                    </Text>
                  </View>
    
        )}
        




        </Pressable>

        <View style={{ height:100}}>

        </View>
      

     
      

    
      
   
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
  pickimage: {
    height:200,
    width:133,
    backgroundColor:colors.Dark_secondary,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  license: {
    marginTop:20,
    height:200,
    width:250,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2 , 
    borderColor:colors.special,
    borderStyle:'dashed'
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
  button: {
    marginTop:40,
    backgroundColor:colors.special,
    height:40,
    width:130,
    alignSelf:'center',
    borderRadius:10, 
    flexDirection:'row',
    alignItems:'center',
   justifyContent:'center'
  },
});
