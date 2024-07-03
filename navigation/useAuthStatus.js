// authUtils.js

import { useEffect, useState } from 'react';
import { supabase } from '../hook/supabaseClient';




export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoggedInStatus = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        // Handle the error, e.g., log it or show an error message
        console.error('Error checking session:', error.message);
        return;
      }

      // Check if the user is logged in
      if (data && data.session === null) {
        setIsLoggedIn(false);
        console.log("session:", data.session);
      } else {
        setIsLoggedIn(true);
        console.log("session:", data.session);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error checking session:', error.message);
    }
  };

  useEffect(() => {
    updateLoggedInStatus();
  }, []);

  // Expose the isLoggedIn state and the updateLoggedInStatus function
  return { isLoggedIn, updateLoggedInStatus };
};
