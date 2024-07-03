import React, { useState, useEffect , createContext} from 'react';
import { View, ScrollView, Text, Image, StyleSheet,  Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Menu} from 'react-native-paper';
import { supabase } from '../../hook/supabaseClient';
import StarRating from 'react-native-star-rating';
import Likes from '../bookpage/likes';
import { useCommentUpdate } from '../bookpage/CommentContext';
import UserImage from '../bookpage/userprofileImage';
import UserName from '../bookpage/username';
import TimeAgo from '../bookpage/commets_time';
import BookImage from './bookImageByComment';
import colors from '../../styles/color';

import LoadingComment from '../loading/loading-comemnt';
import { deleteUserComment as deleteUserComment } from '../../Actions/comments';
import { useAuth } from '@clerk/clerk-expo';



const UserComments = ({ userid }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // State to manage menu visibility for each comment
  const [visible, setVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [comments, setComments] = useState([]);
  const { triggerFetch } = useCommentUpdate();
  const [confirmVisible, setConfirmVisibl] = useState(false);
  const [confirmReportVisible, setConfirmReportVisibl] = useState(false);

  const [expandedComments, setExpandedComments] = useState({});

  const [userComment, setUserComment] = useState(null);

  const currentUserId = userId;

  const fetchComments = async () => {
    if (!userid) {
     
      setFetchError('Book ID is undefined.');
      setLoading(false);
      return;  // Exit the function if no bookid is provided
    }
  
    setLoading(true);  // Set loading to true at the start of the fetch
    try {
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .eq('user_id', userid);
  
      if (error) {
        console.error('Error fetching comments:', error);
        setFetchError('Failed to load comments.');
        setComments([]);  // Set comments to an empty array on error
      } else {
        setComments(data.reverse());
      }
    } catch (error) {
      console.error("sscatch", error);
      setFetchError('An error occurred while fetching comments.');
      setComments([]);  // Ensure comments is always an array
    } finally {
      setLoading(false);  // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userid, triggerFetch]); 


 

  // Function to open the menu for a specific comment
  const openMenu = (comment) => {
    setVisible(true);
    setSelectedComment(comment);
  };

  // Function to close the menu
  const closeMenu = () => {
    setVisible(false);
    setSelectedComment(null);
  };

  const handlePress = (book_id) => {
    // Navigate to the "Book" screen with the book ID
    navigation.navigate('Book', { book_id });
  };


  const EditComment = (comment) => {
    isCommentAllow();
     getMycomment(comment);
  
  };
  
  const AddReport = (comment) => {
    checkAndInsertCommentReport(userId , comment.id , comment.user_id , comment.book_id , comment.content);
    hideReportDialog()
  };
  const DeleteComment  =  async ( userId ,comment) => {
    const Isdelete = await deleteUserComment(userId , comment.user_id, comment.id ,comment.book_id);
    triggerFetch();
    hideDialog();
    if (Isdelete){
      setComments(prevComments => prevComments.filter(c => c.id !== comment.id));
    }
  };

  const showReportDialog = (comment) => {
    setConfirmReportVisibl(true);
    closeMenu();
    setUserComment(comment);
  }

  const showDialog = (comment) => {
    setConfirmVisibl(true);
    closeMenu();
    setUserComment(comment);
  }

  return (
   
    <View style={styles.book}>
      {comments?.length === 0 ? (
        <View style={[styles.CommentOuterContainer , {height:70 , width:'100%' , alignItems:'center' , justifyContent:'center'}]}>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 5 }}> لاتوجد مراجعات للمستخدم </Text>
        </View>
      ) : (
        comments.map((comment) => (
          <View key={comment.id} style={styles.CommentOuterContainer}>
          <Pressable onPress={() => handlePress(comment.book_id)}>
            <View style={styles.commentContainer}>
              {/* <UserImage clerk_id={comment.user_id} /> */}
              <BookImage book_id={comment.book_id} style={{height:120 , width:80}}/>
              <View style={styles.commentContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems:'center' }}>
                  {/* <UserName clerk_id={comment.user_id} />  */}
                      <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={comment.book_rate}
                                starSize={10}
                                fullStarColor={colors.special}
                                style={{}}
                                />
  
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 5 }}>
                    <TimeAgo timestamp={comment.created_at} />
                    <Menu
                          s
                          onDismiss={closeMenu}  contentStyle={{backgroundColor:colors.Dark_primary}} 
                          anchor={
                             <Pressable 
                            //  onPress={() => openMenu(comment)}
                             >
                              <Ionicons name="ellipsis-vertical-outline" size={15} color="white" />
                            </Pressable>
                          }
                        >
                          
                                {/* {comment.user_id === currentUserId && (
                                  <Menu.Item onPress={() => EditComment(comment) }  title={<Text style={{ color: 'white' }}>تعديل</Text>}/>
                                )} */}
                                {comment.user_id === currentUserId && (
                                  <Menu.Item onPress={() => showDialog(comment)} title={<Text style={{ color:colors.red_error }}> حذف </Text>}/>
                                )}
                          <Menu.Item onPress={() =>showReportDialog(comment)} 
                          title={<Text style={{ color:colors.red_error }}>إبلاغ</Text>}
                          
                          />

                        </Menu>
                  </View>
                </View>
  
                <Text style={styles.commentText}>
                  {comment.content}
                </Text>
                <View style={styles.actionsContainer}>
                  {/* <Pressable onPress={() => console.log('Liked')}>
                    <Ionicons name="thumbs-up" size={15} color="white" />
                  </Pressable> */}
                  {/* <Likes bookid={bookid} commentId={comment.id} /> */}
                </View>
              </View>
            </View>

            </Pressable>
            <View style={styles.DrawerDivider} />  
          </View>

          
        ))
      )}

      <View style={{height:50}}>

      </View>
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
  CommentOuterContainer: {
    // backgroundColor: '#212121',
     borderRadius: 10,
      paddingLeft: 5,
       marginTop: 5 ,
       margin:5,
    //    borderWidth: 2,
    // borderColor:"rgba(225, 225, 225, 0.05)",
  },
  DrawerDivider:{
    height: 1, width: '90%', backgroundColor:colors.Dark_secondary,   marginTop:5, alignSelf:'center'

   },


  userImage: {
    width: 110,
    height: 150,
    borderRadius: 0,
  },
  book:{
   
   backgroundColor:"#191919",
   height:'100%',

   marginBottom:'50',

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
    textAlign:'right',
    paddingRight:15,
    marginTop:10,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default UserComments;
