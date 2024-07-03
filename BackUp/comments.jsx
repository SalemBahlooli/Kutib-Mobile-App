import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import Book from '../../Pages/library/Book'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

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
              <View key={comment.id} style={{ backgroundColor: '#4f4e4e', borderRadius: 10, paddingLeft: 5, marginTop: 5 }}>
                <View style={styles.commentContainer}>
                  <Image
                    source={{ uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183410930265104514/skinmc-avatar.png?ex=65883c50&is=6575c750&hm=1fca8b822483927016880a62352e56c80f26d5e89975fd8263d8f235fe266038&' }}
                    style={styles.avatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.name}>{comment.user}</Text>
                    <Text style={styles.commentText}>
                      {comment.text}
                    </Text>
                    <View style={styles.actionsContainer}>
                      <Pressable onPress={() => console.log('Liked')}>
                        <Ionicons name="md-thumbs-up" size={15} color="white" />
                      </Pressable>
                      <Pressable onPress={() => console.log('Disliked')}>
                        <Ionicons name="md-thumbs-down" size={15} color="white" style={{ paddingLeft: 20 }} />
                      </Pressable>
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
