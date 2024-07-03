import React, { useState, useEffect } from 'react';
import {  Text,  Image, StyleSheet, Pressable  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { supabase } from '../../hook/supabaseClient';
import { useUser , useAuth } from '@clerk/clerk-expo';


const AddToLaterBar = ({bookid , }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
 const {  isSignedIn, user } = useUser();
 
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_id', user.id )
          .contains('tags', [bookid]);

          
          

        if (error) {
            console.error('Error fetching data:', error.message);
          
        } else {
            const dataArray = data.map(item => item.id); // Assuming 'id' is the property you want to check

             // Check if array contains the desired value
            const exists = dataArray.includes(bookid); // Replace 'desiredValue' with the value you want to check

            if (exists) {
                // Value exists in the array, log it
                console.log('Value exists:', bookid);
              } else {
                // Value does not exist in the array, do something else
                console.log('Value does not exist:', bookid);
              }
          
         
          
          
        }
      } catch (error) {
        
        setFetchError('An error occurred while fetching users');
      }
    };

    fetchUsers();
  }, [bookid]);

  


 

  return (
    <View>

    </View>
  );
  
  };


  
    
    
    
        
        
        
        
      


  
      
   


const styles = StyleSheet.create({
  scrollView: {
    flexDirection:'column',
  },
 
});

export default AddToLaterBar;
