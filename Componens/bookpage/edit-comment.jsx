
import { StyleSheet, Text, View , Keyboard ,Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect,  useContext , createContext} from 'react';
import colors from '../../styles/color';
import { supabase } from '../../hook/supabaseClient';
import { checkAndInsertComment, updateUserComment } from '../../Actions/comments';
import { askQuestion, generateEmbeddings } from '../../Actions/books';
import { useSignIn , useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';



import OpenAI from "openai";
import { useCommentUpdate } from './CommentContext';
import Toast from 'react-native-toast-message';
import { Pencil, X } from 'lucide-react-native';



export const  Editcomment  = ({ data , isCommentAllow }) => {
    const [comment, setComment] = useState(data.content);
    const { triggerFetch } = useCommentUpdate();
    const [rating, setRating] = useState(data.book_rate);
    const [textInputHeight, setTextInputHeight] = useState(40);
    const [loading, setLoading] = useState(false);
    const {  userId } = useAuth();

    
  
    const onStarRatingPress = (rating) => {
      setRating(rating);
    };

    // Define the external onPress function
    const handleUploadPress = async ( currentuserid , clerk_id, commentid,  bookid, newcontent , rate , previous ) => {
      setLoading(true);

      let array = data.previous ? [...data.previous] : [];
    array.push(data.content);

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
     try {
    setLoading(true);

    const { data, error } = await updateUserComment(currentuserid , clerk_id, commentid,  bookid, newcontent , rate , array);

    if (error) {
      console.log(error);
      
    }
  } catch (error) {
    console.error('Failed to update the comment:', error);
  } finally {
    setLoading(false);
    triggerFetch();
      setComment('');  // Reset the comment input
      Keyboard.dismiss();
      isCommentAllow();
  }
    }


    return(
                <View style={{  height:'auto' , marginBottom:10 ,  }}>
                  <View>

                  </View>
                    <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                                  <View style={{ flex: 1 , marginLeft:50, marginRight:120 }}>
                                    <StarRating
                                      disabled={false}
                                      maxStars={5}
                                      rating={rating}
                                      selectedStar={onStarRatingPress}
                                      starSize={20}
                                      fullStarColor={colors.special}
                                    />
                                  </View>
                                  <Pressable style={{marginRight:10}} onPress={() => isCommentAllow()}>
                                    <X color={colors.special} />
                                  </Pressable>
                                </View>
                    <View style={{flexDirection:'row'}}>
                    <TextInput 
                                 value={comment}
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
                              onPress={() => handleUploadPress( userId , data.user_id, data.id,  data.book_id, comment , rating , data.previous)}
                              disabled={loading}
                            >

                    {loading ? (

                        <ActivityIndicator animating={true} color={colors.special} /> // Change icon and color when uploading
                    ) : (
                      <View>
                         <Pencil size={28} color={colors.special}  />
                         <Text style={{color:colors.special}}>
                          تعديل
                         </Text>

                      </View>
                        
                        
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