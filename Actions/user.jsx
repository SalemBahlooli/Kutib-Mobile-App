import { supabase } from "../hook/supabaseClient";

export async function GetUserDataByClerk(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_id", userId);

  return { data, error };
}

export async function GetUserId(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("clerk_id")
    .eq("clerk_id", userId);

  return { data, error };
}

export const getUserReadLaterListsData = async (userId) => {
  try {
    // Fetch the read later list for the user
    const { data: readLaterList, error: readLaterError } = await supabase
      .from("Readlater")
      .select("book_id")
      .eq("user_id", userId);

    if (readLaterError) {
      throw readLaterError;
    }

    // Extract book IDs from the read later list
    const bookIds = readLaterList.map((item) => item.book_id);

    if (bookIds.length === 0) {
      return [];
    }

    // Fetch book details for the book IDs
    const { data: bookData, error: bookError } = await supabase
      .from("Books")
      .select("*")
      .in("id", bookIds);

    if (bookError) {
      throw bookError;
    }

    return bookData;
  } catch (error) {
    console.error("Error fetching read later books:", error);
    return { error };
  }

  // try {
  //   // Fetch data from the 'favorite' table
  //   const { data: favoriteData, error: favoriteError } = await supabase
  //     .from('favorite')
  //     .select('*')
  //     .eq('user_id', userId);

  //   if (favoriteError) {
  //     throw favoriteError;
  //   }

  //   // Fetch data from the 'done' table
  //   const { data: doneData, error: doneError } = await supabase
  //     .from('done')
  //     .select('*')
  //     .eq('user_id', userId);

  //   if (doneError) {
  //     throw doneError;
  //   }

  //   // Fetch data from the 'readlater' table
  //   const { data: readlaterData, error: readlaterError } = await supabase
  //     .from('Readlater')
  //     .select('*')
  //     .eq('user_id', userId);

  //   if (readlaterError) {
  //     throw readlaterError;
  //   }

  //   // Combine the data into a single object
  //   return {
  //     favorite: favoriteData,
  //     done: doneData,
  //     readlater: readlaterData,
  //   };
  // } catch (error) {
  //   console.error('Error fetching user data:', error);
  //   return { error };
  // }
};
export const getUserDoneListsData = async (userId) => {
  try {
    // Fetch the read later list for the user
    const { data: readLaterList, error: readLaterError } = await supabase
      .from("done")
      .select("book_id")
      .eq("user_id", userId);

    if (readLaterError) {
      throw readLaterError;
    }

    // Extract book IDs from the read later list
    const bookIds = readLaterList.map((item) => item.book_id);

    if (bookIds.length === 0) {
      return [];
    }

    // Fetch book details for the book IDs
    const { data: bookData, error: bookError } = await supabase
      .from("Books")
      .select("*")
      .in("id", bookIds);

    if (bookError) {
      throw bookError;
    }

    return bookData;
  } catch (error) {
    console.error("Error fetching read later books:", error);
    return { error };
  }
};

export const getUserfavoriteListsData = async (userId) => {
  try {
    // Fetch the read later list for the user
    const { data: readLaterList, error: readLaterError } = await supabase
      .from("favorite")
      .select("book_id")
      .eq("user_id", userId);

    if (readLaterError) {
      throw readLaterError;
    }

    // Extract book IDs from the read later list
    const bookIds = readLaterList.map((item) => item.book_id);

    if (bookIds.length === 0) {
      return [];
    }

    // Fetch book details for the book IDs
    const { data: bookData, error: bookError } = await supabase
      .from("Books")
      .select("*")
      .in("id", bookIds);

    if (bookError) {
      throw bookError;
    }

    return bookData;
  } catch (error) {
    console.error("Error fetching read later books:", error);
    return { error };
  }
};
