import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Linking,
  Alert,
  Modal,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserImage from "../Componens/bookpage/userprofileImage";
import UserName from "../Componens/bookpage/username";
import { Ionicons } from "@expo/vector-icons";
import { Icon, MD3Colors, Avatar } from "react-native-paper";
import Home from "./Home/Home";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Login from "./User/Login";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { supabase } from "../hook/supabaseClient";
import colors from "../styles/color";
import { GetUserDataByClerk } from "../Actions/user";
import MyuserName from "../Componens/public/myusername";

const CustomDrawer = (props) => {
  const { signOut } = useAuth();
  const { userId } = useAuth();
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [iEvaluator, setIsEvaluator] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //  const { user } = useClerk();

  //  console.log("User:",user)

  const GoHome = () => {
    navigation.navigate("Home");
  };
  const GoSettings = () => {
    navigation.navigate("Settings");
  };

  const GoProfile = (userId) => {
    navigation.navigate("Profile", { userId });
  };

  const doLogout = async () => {
    signOut();

    console.log("sighn out");
  };

  const GoAddBook = () => {
    navigation.navigate("AddBookMenu");
  };

  const fetchUserData = async () => {
    setLoading(true);
    const { data, error } = await GetUserDataByClerk(userId);
    if (error) {
      setError(error);
    } else {
      setIsAdmin(data[0].Admin); // Assuming the data contains only one user object
      setIsEvaluator(data[0].Evaluator); // Assuming the data contains only one user object
      setIsWriter(data[0].Writer); // Assuming the data contains only one user object
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      return () => {};
    }, [userId])
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingTop: 0,
        backgroundColor: colors.Dark_primary,
        height: "100%",
      }}
    >
      <View
        style={{
          height: 250,
          backgroundColor: colors.special,
          justifyContent: "center",
          alignItems: "center",
          marginRight: -20,
        }}
      >
        <View style={styles.overlay} />

        <View>
          <UserImage clerk_id={userId} style={{ height: 100, width: 100 }} />
        </View>
        <View>
          <MyuserName clerk_id={userId} lefticon={true} />
        </View>
      </View>

      <Pressable onPress={GoHome}>
        <View style={styles.tapcontainer}>
          <Ionicons
            name="home"
            size={16}
            color="white"
            style={{ marginRight: 10 }}
          />

          <Text style={styles.DrawerItemText}>الرئيسية</Text>
        </View>
      </Pressable>

      <View style={styles.DrawerDivider} />

      <Pressable onPress={() => GoProfile(userId)}>
        <View style={styles.tapcontainer}>
          <Ionicons
            name="library"
            size={16}
            color="white"
            style={{ marginRight: 10 }}
          />

          <Text style={styles.DrawerItemText}>مكتبتي</Text>
        </View>
      </Pressable>

      <View style={styles.DrawerDivider} />

      {(isWriter || isAdmin) && (
        <Pressable onPress={GoAddBook}>
          <View style={styles.tapcontainer}>
            <Avatar.Icon
              size={30}
              icon="book-plus"
              color="white"
              style={{
                marginRight: 4,
                backgroundColor: "rgba(128, 128, 128, 0.0)",
              }}
            />
            <Text style={styles.DrawerItemText}>اضف كتاب</Text>
          </View>
          <View style={styles.DrawerDivider} />
        </Pressable>
      )}

      <Pressable onPress={() => GoSettings()}>
        <View style={styles.tapcontainer}>
          <Ionicons
            name="settings"
            size={16}
            color="white"
            style={{ marginRight: 10 }}
          />

          <Text style={styles.DrawerItemText}>الأعدادات</Text>
        </View>
      </Pressable>

      <View style={styles.DrawerDivider} />

      {(!isWriter || isAdmin) && (
        <>
          <View style={styles.tapcontainer}>
            <Ionicons
              name="reader"
              size={16}
              color="white"
              style={{ marginRight: 10 }}
            />

            <Text style={styles.DrawerItemText}>اصبح كاتباً</Text>
          </View>

          <View style={styles.DrawerDivider} />
        </>
      )}

      <Pressable onPress={doLogout}>
        <View style={styles.tapcontainer}>
          <Ionicons
            name="log-in"
            size={16}
            color="white"
            style={{ marginRight: 10 }}
          />

          <Text style={styles.loginText}>تسجيل الخروج</Text>
        </View>
      </Pressable>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white" }}>v1.0.0</Text>
        <Text style={{ color: colors.sub_text, fontSize: 11 }}>
          Beta نسخة تجريبية
        </Text>

        <Text style={{ color: "white", marginTop: 5 }}>
          Made By Salem bhlooli
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  tapcontainer: {
    height: 50,
    //borderRadius:10,
    //  backgroundColor:colors.Dark_secondary,
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 3,
  },

  DrawerItemText: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },

  loginText: {
    color: colors.red_error,
    fontSize: 15,
    marginRight: 10,
    fontWeight: "bold",
  },
  DrawerDivider: {
    height: 1,
    width: "90%",
    backgroundColor: colors.Dark_secondary,
    marginTop: 5,
    alignSelf: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value (0.5 for 50% transparency)
  },
});
