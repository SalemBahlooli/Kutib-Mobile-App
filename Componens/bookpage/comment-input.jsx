
import { StyleSheet, Text, View , Keyboard ,Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect,  useContext , createContext} from 'react';
import colors from '../../styles/color';
import { supabase } from '../../hook/supabaseClient';
import { checkAndInsertComment } from '../../Actions/comments';
import { askQuestion, generateEmbeddings } from '../../Actions/books';
import { useSignIn , useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';



import OpenAI from "openai";
import { useCommentUpdate } from './CommentContext';
import Toast from 'react-native-toast-message';



export const CommentInput = ({ bookid }) => {
    const [comment, setComment] = useState('');
    const { triggerFetch } = useCommentUpdate();
    const [rating, setRating] = useState(5);
    const [textInputHeight, setTextInputHeight] = useState(40);
    const [loading, setLoading] = useState(false);
    const {  userId } = useAuth();

    
  
    const onStarRatingPress = (rating) => {
      setRating(rating);
    };

    const openai = new OpenAI({
      apiKey: 'sk-proj-zL2KN9gFhcSBDG8x57qfT3BlbkFJUUO5jXHJYSdrWk2XSacs'
  });
  
    // Define the external onPress function
    const handleUploadPress = async (supabase, clerk_id, bookid, comment , rate) => {
      setLoading(true);

      // const words = comment.trim().split(/\s+/);
  if (comment.trim().length < 10 ) {

    Toast.show({
      type: 'error',
      text1: 'لايمكنك اضافة التعليق',
      text2: 'التعليق قصير جداً !',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    
    setLoading(false);
    return;
  }

  try{
    await checkAndInsertComment(supabase, clerk_id, bookid, comment , rate);
    triggerFetch();

  }catch(error){


  }finally{
   setLoading(false);
   setComment(''); 
   Keyboard.dismiss();
  }  
      // generateEmbeddings(supabase)

      // askQuestion(supabase , openai);
    };
 


    return(
                <View style={{  height:'%100' , marginBottom:10 , }}>

                    <View style={{marginLeft:50 , marginRight:140 , marginVertical:5}}>
                    <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={rating}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            starSize={20}
                            fullStarColor={colors.special}
                            />
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <TextInput
                                style={styles.TextInput}
                                placeholder="أكتب تعليقك"
                                multiline
                                placeholderTextColor={'white'}
                                color={'white'} 
                                numberOfLines={5} 
                                maxLength={500}   
                                onContentSizeChange={(event) => {
                                // Adjust the height based on the content size
                                const { height } = event.nativeEvent.contentSize;
                                // Set a maximum height if needed
                                const maxHeight = 120;
                                const newHeight = height > maxHeight ? maxHeight : height;
                                // Update the TextInput height
                                setTextInputHeight(newHeight);
                                }}
                                onChangeText={setComment}
                                // onSubmitEditing={() => handleUploadPress(comment)}
                    />
                    <Pressable 
      style={{ justifyContent:'center' ,width:'20%', alignItems:'center' }}
      onPress={() => handleUploadPress(supabase, userId, bookid, comment , rating)}
      disabled={loading}
    >

                    {loading ? (

                        <ActivityIndicator animating={true} color={colors.special} /> // Change icon and color when uploading
                    ) : (
                        <Ionicons name="arrow-up-circle" size={40} color="white" /> // Default icon when not uploading
                        
      )}

                                
                    </Pressable>

                    </View>

                    </View>

    );

    
}



const styles = StyleSheet.create({
  
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
  });