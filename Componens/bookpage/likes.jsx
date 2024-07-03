import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../hook/supabaseClient';
import colors from '../../styles/color';

const Likes = ({ commentId  }) => {

  const [likes, setLikes] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [fetchError, setFetchError] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data, error } = await supabase
          .from('Likes')
          .select('*')
          .eq('comment_id', commentId);

        if (error) {
          setLikes(null);
          setLikesCount(0);
          console.error('Error fetching likes:', error);
        } else {
          setLikes(data);
          setLikesCount(data.length); // Set the count of likes based on the length of the returned array
        }
      } catch (error) {
        setFetchError('An error occurred while fetching likes');
        console.error('Fetch error:', error);
      }
    };

    fetchLikes();
  }, [commentId]); // Ensure dependencies are correctly listed
  

  return (
    
      
    <View>
      {likes !== null && likes !== 0 && (
        <Text style={{ color: colors.sub_text , marginLeft:5, }}>{likesCount}</Text>
      )}
      {/* Other components or UI elements */}
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

export default Likes;
