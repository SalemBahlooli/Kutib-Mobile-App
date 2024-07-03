import React, { useState, useEffect , createContext, useRef} from 'react';
import { View, ScrollView, Text, Image, StyleSheet,  Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Likes from './likes';
import UserName from './username';
import UserImage from './userprofileImage';
import { Menu, Provider, useTheme , ActivityIndicator, MD2Colors, overlay} from 'react-native-paper';
import { supabase } from '../../hook/supabaseClient';
import TimeAgo from './commets_time';
import { useCommentUpdate } from './CommentContext';
import StarRating from 'react-native-star-rating';
import { Button, Dialog, Portal, } from "react-native-paper";



import colors from '../../styles/color';
import { useAuth } from '@clerk/clerk-expo';
import { checkAndInsertCommentReport} from '../../Actions/comments';
import LoadingComment from '../loading/loading-comemnt';
import { deleteUserComment as deleteUserComment } from '../../Actions/comments';





const Comments = ({ bookid , isCommentAllow  , getMycomment}) => {
  // State management
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [visible, setVisible] = useState(false);
const [confirmVisible, setConfirmVisibl] = useState(false);
const [confirmReportVisible, setConfirmReportVisibl] = useState(false);
const [selectedComment, setSelectedComment] = useState(null);
const [expandedComments, setExpandedComments] = useState({});
const [fetchError, setFetchError] = useState(null);
const [comments, setComments] = useState([]);
const [userComment, setUserComment] = useState(null);



const showDialog = (comment) => {
  setConfirmVisibl(true);
  closeMenu();
  setUserComment(comment);
}
  
const hideDialog = () => setConfirmVisibl(false);

const showReportDialog = (comment) => {
  setConfirmReportVisibl(true);
  closeMenu();
  setUserComment(comment);
}
  
const hideReportDialog = () => setConfirmReportVisibl(false);

// Custom hooks
const navigation = useNavigation();
const { triggerFetch } = useCommentUpdate();
const { userId } = useAuth();
const sheetRef = useRef(null);



// Fetch comments from the database
const fetchComments = async () => {
  if (!bookid) {
    setFetchError('Book ID is undefined.');
    return; // Exit the function if no bookid is provided
  }

  setLoading(true); // Set loading to true at the start of the fetch
  try {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('book_id', bookid);

    if (error) {
      console.error('Error fetching comments:', error);
      setFetchError('Failed to load comments.');
      setComments([]); // Set comments to an empty array on error
    } else {
      setComments(data);
    }
  } catch (error) {
    console.error('Error in catch block:', error);
    setFetchError('An error occurred while fetching comments.');
    setComments([]); // Ensure comments is always an array
  } finally {
    setLoading(false); // Ensure loading is set to false after fetching
  }
};

// Fetch comments when bookid or triggerFetch changes
useEffect(() => {
  fetchComments();
}, [bookid, triggerFetch]);

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

// Function to toggle expanded state for a comment
const toggleExpand = (commentId) => {
  setExpandedComments((prev) => ({
    ...prev,
    [commentId]: !prev[commentId],
  }));
};

// Function to navigate to user's profile
const GoProfile = (userId) => {
  navigation.navigate('Profile', { userId });
};

// Get the current user ID from the context or props
const currentUserId = userId; // Replace with the actual current user ID

// Find the current user's comment
const currentUserComment = comments.find(comment => comment.user_id === currentUserId);

// Filter and sort other comments by creation date in descending order
const otherComments = comments
  .filter(comment => comment.user_id !== currentUserId)
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

// Combine the current user's comment with the sorted other comments
// Place the current user's comment at the top if it exists
const sortedComments = currentUserComment ? [currentUserComment, ...otherComments] : otherComments;



return (
  <ScrollView style={styles.book} horizontal={false}>
    {loading ? (
        <LoadingComment/>
    ) : (
      <>
      
        {comments?.length === 0 ? (
          <View style={[styles.CommentOuterContainer, { height: 70, width: '100%', alignItems: 'center', justifyContent: 'center' }]}>
            <Image style={{ height: 25, width: 25 }} source={{ uri: 'https://emojiisland.com/cdn/shop/products/Writing_Hand_Emoji_Icon_ios10_large.png?v=1571606092' }} />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 5 }}>كُن أول من يعلق</Text>
          </View>
        ) : (
          sortedComments.map((comment) => {
            const isExpanded = expandedComments[comment.id];
            return (
              <View key={comment.id} style={styles.CommentOuterContainer}>
                <View style={styles.commentContainer}>
                <Pressable onPress={() => GoProfile(comment.user_id)}>
                          <UserImage clerk_id={comment.user_id} />
                    </Pressable>
                  <View style={styles.commentContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Pressable onPress={() => GoProfile(comment.user_id)}>
                              <UserName clerk_id={comment.user_id} />
                        </Pressable>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={comment.book_rate}
                        starSize={10}
                        fullStarColor={colors.special}
                        

                      />
                      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 5 }}>
                        <TimeAgo timestamp={comment.created_at} />

                       

                        <Menu
                          visible={visible && selectedComment && selectedComment.id === comment.id}
                          onDismiss={closeMenu}  contentStyle={{backgroundColor:colors.Dark_primary}} 
                          anchor={
                             <Pressable onPress={() => openMenu(comment)}>
                              <Ionicons name="ellipsis-vertical-outline" size={15} color="white" />
                            </Pressable>
                          }
                        >
                          
                                {comment.user_id === currentUserId && (
                                  <Menu.Item onPress={() => EditComment(comment) }  title={<Text style={{ color: 'white' }}>تعديل</Text>}/>
                                )}
                                {comment.user_id === currentUserId && (
                                  <Menu.Item onPress={() => showDialog(comment)} title={<Text style={{ color:colors.red_error }}> حذف </Text>}/>
                                )}
                          <Menu.Item onPress={() =>showReportDialog(comment)} 
                          title={<Text style={{ color:colors.red_error }}>إبلاغ</Text>}
                          
                          />

                        </Menu>
                      </View>
                    </View>
                    <Text numberOfLines={isExpanded ? null : 5} style={styles.commentText}>
                      {comment.content}
                    </Text>
                    {comment.content.split('\n').length > 5 && (
                      <Pressable onPress={() => toggleExpand(comment.id)}>
                        <Text style={{ color: colors.special , alignSelf:'flex-start' , marginTop:10 }}>
                          {isExpanded ? 'عرض أقل' : 'قراءة المزيد'}
                        </Text>
                      </Pressable>
                    )}
                    <View style={styles.actionsContainer}>
                      {/* <Pressable onPress={() => console.log('Liked')}>
                        <Ionicons name="thumbs-up" size={15} color="white" />
                      </Pressable>
                      <Likes bookid={bookid} commentId={comment.id} /> */}
                    </View>
                  </View>
                </View>
                <View style={styles.DrawerDivider} />
               
              </View>
            );
          })
        )}
      </>
    )}


< Portal >
      <Dialog visible={confirmVisible} style={{backgroundColor:colors.Dark_primary , backfaceVisibility:'hidden'}} dismissableBackButton={true} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert"  color={colors.special}/>
        <Dialog.Title style={{color:colors.Main_Text ,alignSelf:'center'}}>حذف التعليق</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{color:colors.sub_text , alignSelf:'center'}}>هل انت متأكد من حذف التعليق؟</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()} textColor={colors.sub_text} on>الغاء</Button>
          <Button onPress={() => DeleteComment(userId , userComment)}  textColor={colors.red_error} style={{marginHorizontal:50 }}>حذف</Button>
        </Dialog.Actions>
      </Dialog>


      <Dialog visible={confirmReportVisible} style={{backgroundColor:colors.Dark_secondary}} onDismiss={hideReportDialog} dismissableBackButton={true}>
        <Dialog.Icon icon="alert"  color={colors.special}/>
        <Dialog.Title style={{color:colors.Main_Text ,alignSelf:'center'}}>تقديم بلاغ </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{color:colors.sub_text , alignSelf:'center' , justifyContent:'center'}}> 
          عند تقديم البلاغ، ستقوم الإدارة بمراجعته بعناية.{"\n"}
 وفي حال ثبوت ارتكاب المبلغ عنه لأي مخالفة، سيتم اتخاذ الإجراءات العقابية المناسبة بحقه. 
أما في حال تقديم بلاغ كاذب أو الاستهتار في تقديم البلاغات، فسيتم اتخاذ الإجراءات النظامية بحق مقدم البلاغ.


             </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideReportDialog()} textColor={colors.sub_text} on>الغاء</Button>
          <Button onPress={() => AddReport(userComment)}  textColor={colors.special} style={{marginHorizontal:50}}>بلاغ</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

       
  </ScrollView>
);

}


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
      //  borderWidth: 2,
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
    textAlign:'right',
    paddingRight:15,
    marginTop:10,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default Comments;
