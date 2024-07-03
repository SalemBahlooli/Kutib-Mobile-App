import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../app/Home/Home.js";
import Library from "../app/library/Library.js";
import Book from "../app/library/Book.js";
import Login from "../app/User/Login.js";
import Register from "../app/User/Register.js";
import LoginPage from "../app/User/sign-in-up/loginPage.jsx";
import SignUpPage from "../app/User/sign-in-up/signUpPage.jsx";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
