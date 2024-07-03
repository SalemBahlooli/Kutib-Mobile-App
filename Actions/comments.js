// Define the external onPress function
import {  Alert } from 'react-native';
import { Ratebook } from './books';
import Toast from 'react-native-toast-message';
import { supabase } from '../hook/supabaseClient';
import { useAuth } from '@clerk/clerk-expo';



const handlePressAllert = () => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: 'error',
    text1: 'لا يمكنك اضافة تعليق',
    text2: ' لديك تعليق بالفعل  !',
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const handleAlradeyReport = () => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: 'error',
    text1: 'لا بمكنك اضافة بلاغ',
    text2: ' لديك بلاغ بالفعل  !',
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const handleAddReport = () => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: 'success',
    text1: '  اضافة بلاغ',
    text2: 'تم تقديم البلاغ بنجاح',
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const handleDeleteComment = () => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: 'success',
    text1: 'حذف التعليق',
    text2: 'لقد تم حذف تعليقك',
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};
const handleUpsateComment = () => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: 'success',
    text1: 'تعديل التعليق',
    text2: 'لقد تم تعديل تعليقك',
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};


export async function checkAndInsertComment(supabase, clerk_id, bookid, comment , rate) {
  let uploading = true;

  // Query to find records matching book_id but not user_id '1'
  const checkResponse = await supabase
    .from('Comments')
    .select('*')
    .eq('book_id', bookid)
    .eq('user_id', clerk_id);

// Check if there was an error in the query
if (checkResponse.error) {
  console.error('Error checking existing comments:', checkResponse.error);
  return { uploading };
}

  // Check if any records exist that meet the criteria
  if (checkResponse.data.length === 0) {
    // If no records exist, proceed with insertion
    uploading = await insertComment(supabase, clerk_id, bookid, comment , rate);
    return { uploading };
  } else {
    uploading = false;
    console.log('A comment from the same user on this book already exists.');
    handlePressAllert();
    return { uploading };
  }
}

export async function insertComment(supabase, clerk_id, bookid, comment , rate) {
  let uploading = false;

  const insertResponse = await supabase.from('Comments').insert([
    { user_id: clerk_id, book_id: bookid, content: comment , book_rate:rate },
  ]);

  // Check for errors in the insertion
  if (insertResponse.error) {
    uploading = false;
    console.error('Error during insertion:', insertResponse.error);
  } else {
    console.log('Comment inserted successfully:', insertResponse.data);
    uploading = false;
    Ratebook(supabase,bookid);
  }

  return uploading;
}


export async function getCommentBookImage(supabase, bookid) {
  try {
    // Await the query to fetch the image
    const { data, error } = await supabase
      .from('Books')
      .select('URLImage')
      .eq('id', bookid)
      // .single(); // Assuming you expect only one result for the given bookid

    // Check if there was an error in the query
    if (error) {
      console.error('Error fetching book image:', error.message);
      return null; // Return null or any other default value indicating failure
    }

    // Return the image data if available
    return data ? data.URLImage : null; // Return null if no data is available
  } catch (error) {
    console.error('Error fetching book image:', error.message);
    return null; // Return null or any other default value indicating failure
  }
}


export async function checkAndInsertCommentReport(claimant_id, comment_id , culprit_id , book_id , content ) {
  let loading = true;

  // Query to find records matching book_id but not user_id '1'
  const checkResponse = await supabase
    .from('CommentReport')
    .select('*')
    .eq('comment_id', comment_id)
    .eq('claimant_id', claimant_id);

// Check if there was an error in the query
if (checkResponse.error) {
  console.error('Error checking existing Report:', checkResponse.error);
  return { loading:false };
}

  // Check if any records exist that meet the criteria
  if (checkResponse.data.length === 0) {
    // If no records exist, proceed with insertion
   const  data = await insertReport( claimant_id, comment_id , culprit_id , book_id , content);
    return { loading: false , data };
  } else {
    loading = false;
    console.log('A report from the same user on this comment already exists.');
    handleAlradeyReport();
    return { loading };
  }
}

export async function insertReport(claimant_id, comment_id , culprit_id , book_id , content) {
  let uploading = false;

  const insertResponse = await supabase.from('CommentReport').insert([
    { claimant_id: claimant_id, comment_id:comment_id ,  culprit_id: culprit_id, book_id: book_id, content: content  },
  ]);

  if (insertResponse.error) {
    uploading = false;
    console.error('Error during insertion:', insertResponse.error);
  } else {
    console.log('Report inserted successfully:', insertResponse.data);
    uploading = false;
    handleAddReport();
  }

  return uploading;
}

export async function deleteUserComment( currentuserid ,userid , commentid , bookid) {

  if (currentuserid !== userid) {
    return { error: 'Unauthorized user' };
  }

  const { error } = await supabase
   .from('Comments')
    .delete()
    .eq('id', commentid)
    .eq('book_id', bookid)
    .eq('user_id', userid);

  if (!error){
    handleDeleteComment();
    return {loading:false}
  }
}


export async function updateUserComment( currentuserid ,userid , commentid , bookid , newContent , rate , previous) {
  
  if (currentuserid !== userid) {
    return { error: 'Unauthorized user' };
  }

  const { data, error } = await supabase
   .from('Comments')
   .update({ content: newContent , previous:previous ,  book_rate:rate })
    .eq('id', commentid)
    .eq('book_id', bookid)
    .eq('user_id', userid);

    if (error) {
      console.error('Error updating comment:', error);
      return { error };
    }

  if (!error){
    handleUpsateComment();
    return { data };
  }
}



