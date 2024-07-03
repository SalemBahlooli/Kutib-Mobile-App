import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import Book from '../../Pages/library/Book'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';
import Likes from './likes';
import UserName from './username';
import UserImage from './userprofileImage';


const Comments = ({ bookid }) => {
  const [comments, setComments] = useState([]);
  const [liks, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.116:5000/books/${bookid}/comments`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const commentsResult = await response.json();
        setComments(commentsResult);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [bookid]); // Include bookid as a dependency

  return (
      <ScrollView style={styles.book} horizontal={false}>
        {comments.length === 0 ? (
         <View style={{ backgroundColor: '#4f4e4e', borderRadius: 10, paddingLeft: 5, marginTop: 5 , height:80 , justifyContent:'center' , alignItems:'center' , flexDirection:'row'   }}> 
          
          <Image style={{height:25, width:25}} source={{uri: 'https://emojiisland.com/cdn/shop/products/Wink_Emoji_2_large.png?v=1571606113',
      }}/>
      <Text style={{ color: 'white' , fontSize:15, marginLeft:5 , }}>كُن أول من يعلق   </Text>
         </View>
          

        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={{ backgroundColor: '#4f4e4e', borderRadius: 10, paddingLeft: 5, marginTop: 5 , }}>
              
              <View style={styles.commentContainer}>
                <UserImage userId={comment.user_id} />
                <View style={styles.commentContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                 <UserName userId={comment.user_id} />
                 <Pressable onPress={() => console.log('Options Pressed')}>
                   <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight:5 }}>
               
                       <Ionicons name="ellipsis-vertical-outline" size={15} color="white" />
                   </View>
                 </Pressable>
                   
                </View>
                  
                  <Text style={styles.commentText}>
                    {comment.text}
                  </Text>
                  <View style={styles.actionsContainer}>
                    <Pressable onPress={() => console.log('Liked')}>
                      <Ionicons name="md-thumbs-up" size={15} color="white" />
                    </Pressable>
                    <Likes bookid={bookid} commentId={comment.id} />
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    );
    
};
  


const styles = StyleSheet.create({
  scrollView: {
    flexDirection:'column',
  },
  userContainer: {
    marginLeft: 3,
  },
  userImage: {
    width: 110,
    height: 150,
    borderRadius: 0,
  },
  book:{
   
   backgroundColor:"#191919",
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
});

export default Comments;
