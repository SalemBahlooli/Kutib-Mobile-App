import { supabase } from "../../hook/supabaseClient";




export async function getPrivacyDataOfUser( clerk_id) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('ReadedList , LaterList , FavoriteLits ')
      .eq('clerk_id', clerk_id);

    if (error) {
      console.error('Error checking existing records:', error);
      return null;
    } else{
        return {data};
    }

  } catch (error) {

    return null ;
  }
  }
export async function UpdatePrivacyDataOfUser( clerk_id , FavoriteLits , LaterList , ReadedList ) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ FavoriteLits:FavoriteLits , LaterList:LaterList , ReadedList:ReadedList })
      .eq('clerk_id', clerk_id)
      .select('ReadedList , LaterList , FavoriteLits ');

    if (error) {
      console.error('Error checking existing records:', error);
      return null ;

    } else{
        return{data};
    }
  } catch (error) {
   return null ;
  }
  }