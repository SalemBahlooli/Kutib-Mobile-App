import { supabase } from "../../hook/supabaseClient";



  // Shuffle the bookList array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

 

  export async function GetAllListedBooks() {
    const { data, error } = await supabase
      .from('Books')
      .select('id, URLImage');
  
    if (error) {
      return { displayBooks: [], error };
    }
  
    const shuffledBooks = shuffleArray(data);
    const displayBooks = shuffledBooks.slice(0, 15);
  
    return { displayBooks, error };
  }
