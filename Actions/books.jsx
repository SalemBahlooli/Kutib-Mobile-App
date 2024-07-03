import OpenAI from "openai";
import {  Alert } from 'react-native';
import Toast from "react-native-toast-message";



   
// generateEmbeddings
export async function generateEmbeddings(supabase) {
    try {
        // Initialize OpenAI API
        const openai = new OpenAI({
            apiKey: 'sk-proj-zL2KN9gFhcSBDG8x57qfT3BlbkFJUUO5jXHJYSdrWk2XSacs'
        });

        // Custom data
        const documents = "يتحدث عن السرقة وعن السارق المحترف ارسلين الذي يسرق بخفة يد ومهارة عالية وهو لص لطيف";
        const input = documents.replace(/\n/g, '');

        try {
            // Generate embedding
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-ada-002", // Model for embeddings
                input,
                encoding_format: "float",
            });

            if (embeddingResponse && embeddingResponse.data) {
                const embedding = embeddingResponse.data[0].embedding; // Correctly accessing the embedding

                // Store the embedding in Supabase
                await supabase.from('Books').insert([{
                    name: 'ارسلين لوبين',
                    author: 'Salem',
                    description: documents,
                    rate: 5,
                    embedding: embedding,
                }]);
                console.log("Done:", embedding);
            } else {
                console.log("No data returned from embedding API");
            }
        } catch (error) {
            console.log("Error processing embedding:", error);
        }

    } catch (error) {
        console.log("Error initializing OpenAI client:", error);
    }
};

const ask = "من هو ارسلين" ;



export async function askQuestion(supabase , openai) {

    try{
        const { data, error } = await supabaseClient.functions.invoke('ask-custom-data', {
            ask
    })
        console.log("data:",data);
        if (error) {
            console.log("Error details:", error);
            console.log("Error status:", error.status);
            console.log("Error message:", error.message);
        }


    } catch(error){

        console.log(error);
    }
    
}


export async function Ratebook(supabase, bookid) {
        // Fetch ratings from comments
        const { data: comments, error } = await supabase
        .from('Comments')
        .select('book_rate')
        .eq('book_id', bookid);

        if (error) {
        console.error('Error fetching comments:', error);
        return;  // Exit the function if there was an error fetching comments
        }

        // Calculate the average rating
        const validRatings = comments.filter(comment => comment.book_rate !== null);
        const sumOfRatings = validRatings.reduce((acc, curr) => acc + curr.book_rate, 0);
        const averageRating = validRatings.length > 0 ? sumOfRatings / validRatings.length : 0;



        if (validRatings.length > 0) {
            const { error: updateError } = await supabase
              .from('Books')
              .update({ rate: averageRating.toFixed(1) })
              .eq('id', bookid)
              .select();
            if (updateError) {
              console.error('Error updating book rating:', updateError);
              return;  // Exit the function if there was an error updating the book
            }
          }

          console.log('Updated average rating:', averageRating);
    
  }

  const handlePressAllertEx = () => {
    // Open the bookUrl in the device's default browsers
    Toast.show({
      type: 'error',
      text1: 'لا بمكن اضافة الكتاب',
      text2: 'الكتاب موجود بالفعل !',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const handlePressAllertAdd = () => {
    Toast.show({
      type: 'success',
      text1: 'اضافة الكتاب',
      text2: 'تم اضافة الكتاب الى قائمتك',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };
  const handlePressAllertDe = () => {
    Toast.show({
      type: 'success',
      text1: 'ازالة الكتاب',
      text2: ' تم ازالة الكتاب من القائمة',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  export async function checkLater(supabase, clerk_id, bookid) {
    let loading = true;

  try {
    // Query to find records matching book_id and user_id
    const { data, error } = await supabase
      .from('Readlater')
      .select('*')
      .eq('book_id', bookid)
      .eq('user_id', clerk_id);

    // Check if there was an error in the query
    if (error) {
      console.error('Error checking existing records:', error);
      return { loading, exists: false };
    }

    // Check if any records exist that meet the criteria
    loading = false;
    const exists = data.length > 0;
    // console.log("chaeck later:",exists)

    

    return { loading, exists };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    return { loading, exists: false };
  }
  }



  export async function checkAndInsertlater(supabase, clerk_id, bookid, image) {
    let uploading = true;
  
    // Query to find records matching book_id but not user_id '1'
    const checkResponse = await supabase
      .from('Readlater')
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
      uploading = await insertlater(supabase, clerk_id, bookid, image);
      return { uploading };
    } else {
      uploading = false;
      handlePressAllertEx();
      return { uploading };
    }
  }
  
  export async function insertlater(supabase, clerk_id, bookid, image) {
  
    const insertResponse = await supabase.from('Readlater').insert([
      { user_id: clerk_id, book_id: bookid, image: image  },
    ]);
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      console.log('Comment inserted successfully:', insertResponse.data);
      handlePressAllertAdd();
      
    }
  
    
  }

  export async function deletelater(supabase, clerk_id, bookid) {


    
         const insertResponse = await supabase
            .from('Readlater')
            .delete()
            .eq('book_id', bookid)
            .eq('user_id', clerk_id);
        
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      handlePressAllertDe();
      
    }
  
    
  }

  export async function checkfavorite(supabase, clerk_id, bookid) {
    let loading = true;

  try {
    // Query to find records matching book_id and user_id
    const { data, error } = await supabase
      .from('favorite')
      .select('*')
      .eq('book_id', bookid)
      .eq('user_id', clerk_id);

    // Check if there was an error in the query
    if (error) {
      console.error('Error checking existing records:', error);
      return { loading, exists: false };
    }

    // Check if any records exist that meet the criteria
    loading = false;
    const exists = data.length > 0;
    // console.log("chaeck favorite:",exists)

    

    return { loading, exists };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    return { loading, exists: false };
  }
  }


  export async function checkAndInsertfavorite(supabase, clerk_id, bookid, image) {
    let uploading = true;
  
    // Query to find records matching book_id but not user_id '1'
    const checkResponse = await supabase
      .from('favorite')
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
      uploading = await insertfavorite(supabase, clerk_id, bookid, image);
      return { uploading };
    } else {
      uploading = false;
      handlePressAllertEx();
      return { uploading };
    }
  }
  
  export async function insertfavorite(supabase, clerk_id, bookid, image) {
  
    const insertResponse = await supabase.from('favorite').insert([
      { user_id: clerk_id, book_id: bookid, image: image  },
    ]);
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      console.log('Comment inserted successfully:', insertResponse.data);
      handlePressAllertAdd();
      
    }
  
    
  }

  export async function deletefavorite(supabase, clerk_id, bookid) {


    
         const insertResponse = await supabase
            .from('favorite')
            .delete()
            .eq('book_id', bookid)
            .eq('user_id', clerk_id);
        
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      handlePressAllertDe();
      
    }
  
    
  }
  export async function checkdone(supabase, clerk_id, bookid) {
    let loading = true;

  try {
    // Query to find records matching book_id and user_id
    const { data, error } = await supabase
      .from('done')
      .select('*')
      .eq('book_id', bookid)
      .eq('user_id', clerk_id);

    // Check if there was an error in the query
    if (error) {
      console.error('Error checking existing records:', error);
      return { loading, exists: false };
    }

    // Check if any records exist that meet the criteria
    loading = false;
    const exists = data.length > 0;
    // console.log("chaeck done:",exists)

    

    return { loading, exists };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    return { loading, exists: false };
  }
  }


  export async function checkAndInsertdone(supabase, clerk_id, bookid, image) {
    let uploading = true;
  
    // Query to find records matching book_id but not user_id '1'
    const checkResponse = await supabase
      .from('done')
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
      uploading = await insertdone(supabase, clerk_id, bookid, image);
      return { uploading:false };
    } else {
      uploading = false;
      handlePressAllertEx();
      return { uploading };
    }
  }
  
  export async function insertdone(supabase, clerk_id, bookid, image) {
  
    const insertResponse = await supabase.from('done').insert([
      { user_id: clerk_id, book_id: bookid, image: image  },
    ]);
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      console.log('Book inserted successfully:', insertResponse.data);
      handlePressAllertAdd();
      
    }
  
    
  }

  export async function deletedone(supabase, clerk_id, bookid) {


    
         const insertResponse = await supabase
            .from('done')
            .delete()
            .eq('book_id', bookid)
            .eq('user_id', clerk_id);
        
  
    // Check for errors in the insertion
    if (insertResponse.error) {
      
      console.error('Error during insertion:', insertResponse.error);
    } else {
      handlePressAllertDe();
      
    }
  
    
  }


















