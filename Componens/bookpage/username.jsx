import React, { useState, useEffect } from 'react';
import {  Text,  Image, StyleSheet, Pressable  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { supabase } from '../../hook/supabaseClient';


const UserName = ({clerk_id ,  fontSize , lefticon , righticon  , style}) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [fetchError, setFetchError] = useState(null);
  const [FontSize, setFontSize] = useState(16);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_id', clerk_id)

        if (error) {
          setFetchError('Could not fetch users');
          setUsers(null);
        } else {
          setUsers(data);
          // console.log(data);
          setFetchError(null);
          if (fontSize){
            setFontSize(fontSize);
          }

        }
      } catch (error) {
        
        setFetchError('An error occurred while fetching users');
      }
    };

    fetchUsers();
  }, [clerk_id]);

  


 

  return (
    <React.Fragment>
  {fetchError && <Text>{fetchError}</Text>}
  {users && users[0] ? (
    <React.Fragment>
      <View style={{ flexDirection: 'row' }}>

      {righticon === true&& (
        <View style={{marginRight:5 , marginTop:4 }}>
           {users[0].Admin && (
          <Ionicons name="shield-checkmark" size={15} color="#a042ff"  />
        )}

        {users[0].Writer && (
          <Ionicons name="book" size={15} color="#14b0ff" />
        )}

        {users[0].Rater && (
          <Ionicons name="ribbon" size={15} color="#14b0ff" />
        )}
        </View>
      )}




           
<Text style={{ fontSize: FontSize, color: 'white', fontWeight: 'bold' }}>
  {users[0].name}
</Text>

        
 

        {lefticon === true&& (
         <View style={{marginLeft:5 , marginTop:4 }}>
           {users[0].Admin && (
          <Ionicons name="shield-checkmark" size={15} color="#a042ff" />
        )}

        {users[0].Writer && (
          <Ionicons name="book" size={15} color="#14b0ff" />
        )}

        {users[0].Rater && (
          <Ionicons name="ribbon" size={15} color="#14b0ff" />
        )}
        </View>
      )}

       
      </View>
    </React.Fragment>
  ) : (
    <Text></Text>
  )}
</React.Fragment>
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

export default UserName;
