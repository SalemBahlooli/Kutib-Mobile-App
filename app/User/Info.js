
import { useSignIn } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert , Image ,TouchableWithoutFeedback, Keyboard } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from 'expo-image-picker';
import PhoneInput from 'react-native-phone-input';

const Info = () => {
  
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleScreenPress = () => {
      // Dismiss the keyboard when the screen is tapped
      Keyboard.dismiss();
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
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log('ImagePicker Result:', result);
    
        if (!result.cancelled ) {
          setSelectedImage(result.assets[0].uri);
          console.log('Selected Image URI:', result.uri);
        } else {
          console.log('Image selection cancelled');
        }
        
      } catch (error) {
        console.error('Error picking image:', error);
      }
    };
    
    

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>

    
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Spinner visible={loading} />

      <View style={{}}>
         

      </View>

     

      <View style={{backgroundColor:'white' , width:300 , height:350 , alignSelf:'center' , borderRadius:20,  }}>
      <Pressable onPress={handleImagePick} style={styles.pickimage}>
  {selectedImage ? (
    <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
  ) : (
    <Ionicons name="image" size={30} color="white" />
  )}
</Pressable>

{console.log('Selected Image:', selectedImage)}

      <Text style={styles.placeholderText}>أختر اسم المستخدم</Text>
      <TextInput
        style={styles.TextInput}
        multiline
        placeholderTextColor={'black'}
        color={'white'} 
      />

<Text style={styles.placeholderText}> الرقم </Text>
   <PhoneInput ref={(ref) => (this.phone = ref)} 
   style={styles.TextInput}
   initialCountry="sa"
   flagStyle={{marginLeft:10}}
   autoFormat={true}
   
   
   />

<Text style={styles.placeholderText}>  نبذة عنك (يظهر في صفحتك الشخصية)</Text>
      <TextInput
        style={styles.TextInputabout}
        multiline
        placeholderTextColor={'black'}
        color={'white'} 
      />

      </View>
      

    </View>
    </TouchableWithoutFeedback>
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#FF5733'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 for 50% transparency)
  },
  pickimage: {
    height:120,
    width:120,
    backgroundColor:'#e0e0e0',
    alignSelf:'center',
    borderRadius:60,
    marginTop:-80,
    
    alignItems:'center',
    justifyContent:'center'
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius:60,
    
  },

  text:{
    justifyContent:'center',
    alignItems: 'center',
    marginBottom:15,
  },
  TextInput:{
    backgroundColor:'#e0e0e0' ,
     height:60,
      width:280,
      borderRadius:20,
      textAlign: 'right',
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginTop:5 ,
      height: 40, // or use height: 'flex'
    maxHeight: 120, 
    alignSelf:'center',

  },
  placeholderText: {
    marginRight: 10, // Adjust the margin as needed
    marginTop: 5, // Adjust the margin as needed
    color: 'gray', // Placeholder text color
    textAlign:'right'
  },
  TextInputabout:{
    backgroundColor:'#e0e0e0' ,
      width:280,
      borderRadius:20,
      textAlign: 'right',
      textAlignVertical: 'top',
      marginBottom:5 ,
      marginTop:5 ,
      height: 80, // or use height: 'flex'
    maxHeight: 120, 
    alignSelf:'center',

  },
  
  
});


export default Info;