import 'react-native-gesture-handler';
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../app/Home/Home.js";
import Library from "../app/library/Library.js";
import Book from "../app/library/Book.js";
import Login from "../app/User/Login.js";
import Profile from '../app/User/Profile.jsx';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../app/CustomDrawer.jsx';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text } from 'react-native';
import AddBook from '../app/library/AddBookComponents/Add-Book.jsx';
import AddBookMenu from '../app/library/AddBookComponents/Add-Book-Menu.jsx';
import ReviewRequest from '../app/library/AddBookComponents/review-request.jsx';
import Settings from '../app/User/settings/setting.jsx';




const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();


const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Library" component={Library} />
    <Stack.Screen name="Book" component={Book} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="AddBook" component={AddBook} />
    <Stack.Screen name="AddBookMenu" component={AddBookMenu} />
    <Stack.Screen name="ReviewRequest" component={ReviewRequest} />
    <Stack.Screen name="Settings" component={Settings} />

  </Stack.Navigator>
);
const AppStack = () => {

    return(
 
      <Drawer.Navigator
      
      drawerActiveTintColor="#FF5733" // Set the active item color
      drawerInactiveTintColor="white" // Set the inactive item color
      drawerStyle={{
        backgroundColor: '#191919', // Set the background color of the entire drawer
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false, drawerPosition: 'right', swipeEnabled: false }}
      contentContainerStyle={{
        backgroundColor: 'white', // Set the background color of the content area
      }}
    >
      
          <Drawer.Screen name="Main" component={HomeStack} />
          <Drawer.Screen name="Library" component={Library}  />
          <Drawer.Screen name="Book" component={Book}  />
          <Drawer.Screen name="Login" component={Login}  />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="AddBook" component={AddBook} />
          <Drawer.Screen name="AddBookMenu" component={AddBookMenu} />

       </Drawer.Navigator>
     

       
        
      
      
    )
    





}

export default AppStack