import React, { useState, useEffect } from 'react';
import {  Text,  Image, StyleSheet, Pressable , ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { supabase } from '../../hook/supabaseClient';





const UserImage = ({ clerk_id, style }) => {
  const [user, setUser] = useState(null); // Use null instead of an empty array to denote no user data
  const [loading, setLoading] = useState(true); // Start with loading true to fetch data immediately
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('ImageURL')
          .eq('clerk_id', clerk_id);

        if (error) {
          throw error;
        }

        setUser(data[0]); // Assuming that each clerk_id will have only one profile
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching image:", error);
        setFetchError('An error occurred while fetching user');
        setUser(null);
      } finally {
        setLoading(false); // Ensure loading is set to false in both cases
      }
    };

    fetchUsers();
  }, [clerk_id]);

  // Define a placeholder or loading image URL
  const placeholderImage = 'https://i.ibb.co/y6fw708/brain-in-meditation-i-Stock-1310277551-1024x853.jpg';

  return (
    <View>
      {loading ? (
        <Image
          source={{ uri: placeholderImage }}
          style={[styles.avatar, style]}
          resizeMode="cover"
        />
      ) : user ? (
        <Image
          source={{ uri: user.ImageURL }}
          style={[styles.avatar, style]}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: placeholderImage }}
          style={[styles.avatar, style]}
          resizeMode="cover"
        />
      )}
      {fetchError && (
        // Optionally render the error message
        <Text>{fetchError}</Text>
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

export default UserImage;
