import OpenAI from "openai";
import {  Alert } from 'react-native';
import { supabase } from "../hook/supabaseClient";
import Toast from "react-native-toast-message";



  export async function getUnderReviewBooks(clerk_id) {
    let loading = true;

  try {
    // Query to find records matching book_id and user_id
    const { data, error } = await supabase
      .from('UnderReview')
      .select('*')
      .eq('user', clerk_id)
      .eq('underreview', true);

    // Check if there was an error in the query
    if (error) {
      console.error('Error checking existing records:', error);
      return { error };
    }

    if (data){
       loading = false;
    
    return { loading , data };
    }
   

    

    
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    return { error};
  }
  }

  export async function getDoneReviewBooks(clerk_id) {
    let loading = true;

  try {
    // Query to find records matching book_id and user_id
    const { data, error } = await supabase
      .from('UnderReview')
      .select('*')
      .eq('user', clerk_id)
      .eq('underreview', false);

    // Check if there was an error in the query
    if (error) {
      console.error('Error checking existing records:', error);
      return { error };
    }

    if (data){
       loading = false;
    
    return { loading , data };
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    return { error};
  }
  }



  export async function SendBookUnderView(
    title,
    author,
    description,
    URLImage,
    license,
    owner,
    tags,
    BookURL,
    category,) {

   
    const insertRequest = await supabase.from('UnderReview').insert([
      { title:title,
        author: author,
        description:description ,
        imageURL: URLImage ,
        license:license,
        user:owner,
        tags:tags,
        bookURL:BookURL,
        category:category,

        },
    ]);
  
    if (insertRequest.error) {
      
      console.error('Error during insertion:', insertRequest.error);
      
    } else {
      console.log('Request inserted successfully:', insertRequest.data);
      Toast.show({
        type: 'success',
        text1: '  اضافة مراجعة للكتاب',
        text2: 'تم تقديم طلب اضافة كتاب ',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
       return {insertRequest , error: null} 
    }
  
    return ;
  }



  
