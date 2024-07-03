import * as FileSystem from 'expo-file-system';
import { supabase } from '../../hook/supabaseClient';
import { selectImage } from './uploadBookImage';



 export const uploadImageToSupabase = async (file, path) => {
  try {
    const { data: image, error: uploadError } = await supabase.storage
      .from('book_cover')
      .upload(path, file, {
        contentType: 'image/jpeg', // Ensure the correct content type
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return { data: null, error: uploadError };
    } else {
      // console.log('Image uploaded:', image);

      const { data: urlData, error: urlError } = supabase.storage
        .from('book_cover')
        .getPublicUrl(path);

      if (urlError) {
        console.error('URL Error:', urlError);
        return { data: null, error: urlError };
      } else {
        // console.log('Public URL:', urlData.publicUrl);
        return { data: urlData.publicUrl, error: null };
      }
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
    return { data: null, error };
  }
  };

// const handleImageUpload = async () => {
//   const image = await selectImage();
//   if (image) {
//     await uploadImageToSupabase(image.uri, image.fileName);
//   }
// };
