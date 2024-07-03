import React, { useState , useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useAuth  } from "@clerk/clerk-expo";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text, StyleSheet , Keyboard , TouchableWithoutFeedback } from "react-native";
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import * as SecureStore from "expo-secure-store";
import InfoStack from './navigation/InfoStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';





import { supabase } from './hook/supabaseClient';
import Toast from 'react-native-toast-message';
import { toastConfig } from './Componens/tost-config';
import OfflineNotice from './app/OfflineNotice';
import UnderMaintenance from './app/underMaintenance';
const CLERK_PUBLISHABLE_KEY = 'pk_test_bW92aW5nLWtpdC0yNy5jbGVyay5hY2NvdW50cy5kZXYk';

const handleScreenPress = () => {
  // Dismiss the keyboard when the screen is tapped
  Keyboard.dismiss();
};


export default function App() {

  const [isConnected, setIsConnected] = useState(true);
  const [underMaintenance, setUnderMaintenance] = useState(false);


  const getAppSettings = async () => {

        const { data, error } = await supabase
      .from('appsettings')
      .select('setting_name, setting_value')
      .eq('setting_name', 'under_maintenance')
      .single();
      

      if (error) {
        console.error('Error fetching app settings:', error);
        setUnderMaintenance(true); 
        
      } else{
        setUnderMaintenance(data.setting_value);
        
      }
      
    };
  

  useEffect(() => {

    getAppSettings();  
  }, []);


  if (underMaintenance) {
    return (
     <UnderMaintenance/>
    );
  }
  
 




 const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
 
  


  return (  
    <GestureHandlerRootView style={{ flex: 1 }}>
         <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
                <PaperProvider>
                  <NavigationContainer>
                      
                    
                          <SignedIn>
                            <TouchableWithoutFeedback onPress={handleScreenPress}>
                              <AppStack/>
                            </TouchableWithoutFeedback>
                          </SignedIn>


                          <SignedOut>
                            <AuthStack />
                          </SignedOut>



                          <Toast config={toastConfig} />
                  </NavigationContainer>
                </PaperProvider>
  </ClerkProvider>
    </GestureHandlerRootView>

 
  
 
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});