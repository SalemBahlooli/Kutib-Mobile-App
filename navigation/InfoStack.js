import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../app/Home/Home.js";
import Library from "../app/library/Library.js";
import Book from "../app/library/Book.js";
import Login from "../app/User/Login.js";
import Register from "../app/User/Register.js";
import Info from "../app/User/Info.js";


const Stack = createNativeStackNavigator();

const InfoStack = () => {

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Info" component={Info}  />
        
      </Stack.Navigator>
    )





}

export default InfoStack