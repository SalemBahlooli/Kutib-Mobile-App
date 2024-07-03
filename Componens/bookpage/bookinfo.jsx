import React, { useState, useEffect } from 'react';
import {  Text,  Image, StyleSheet, Pressable  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';


const Bookinfo = ({userId }) => {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.0.116:5000/users/${userId}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const commentsResult = await response.json();
        setuser(commentsResult);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []); // Include bookid as a dependency

  return (
    
    <View style={{ flexDirection: 'row' }}>
    <Text style={styles.name}> {user.name} </Text>

    {user.Admin && (
      <Ionicons name="shield-checkmark" size={15} color="#a042ff"  />
    )}

    {user.Writer && (
      <Ionicons name="book" size={15} color="#14b0ff"  />
    )}

    {user.Rater && (
      <Ionicons name="ribbon" size={15} color="#14b0ff"  />
    )}
  </View>
        
        
        
        
      


  
      
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

export default Bookinfo;
