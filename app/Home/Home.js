import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import Book_list from "../../Componens/home/book_list";
import Top_Book_list from "../../Componens/home/Book_list_TopRate";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import HeaderBar from "../../Componens/public/headerBar";
import colors from "../../styles/color";
import Readlaetr from "../../Componens/home/ReadLater";
import Booklist from "../../Componens/home/book-list-component";
import { GetAllListedBooks } from "../../Actions/books/getBooksData";
import SkeletonExpo from "moti/build/skeleton/expo";
import { GetUserDataByClerk } from "../../Actions/user";
import CreatingAccount from "../CreatingAccount";
import LoginPage from "../User/sign-in-up/loginPage";

export default function Home({}) {
  const { userId } = useAuth();

  const Open_Library = () => {
    navigation.navigate("Library");
  };
  const Open_Book = () => {
    navigation.navigate("Book");
  };

  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const { displayBooks, error } = await GetAllListedBooks();
  //       console.log("list:",displayBooks);
  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setBooks(displayBooks);
  //       console.log("list:",books);
  //     }
  //     // setLoading(false);
  //   };

  //   fetchBooks();
  // }, []);

  return (
    <View style={{ backgroundColor: colors.Dark_primary, flex: 1 }}>
      <HeaderBar
        LeftIcon={"library"}
        navigateTo={"Library"}
        MainText={"الرئيسية"}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.dividor}>
            <Text style={{ fontSize: 15, color: "#fff", alignItems: "center" }}>
              الاكثر رواجاً
            </Text>
          </View>

          <Book_list />
          <View style={styles.dividor}>
            <Text style={{ fontSize: 15, color: "#fff", alignItems: "center" }}>
              {" "}
              الأعلى تقييماً
            </Text>
          </View>

          <Top_Book_list />

          <View style={styles.dividor}>
            <Text style={{ fontSize: 15, color: "#fff", alignItems: "center" }}>
              {" "}
              أقرأه لاحقاً
            </Text>
          </View>

          <Readlaetr userId={userId} />
          <View style={styles.dividor}>
            <Text style={{ fontSize: 15, color: "#fff", alignItems: "center" }}>
              {" "}
              أقرأه لاحقاً
            </Text>
          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1 ,
    backgroundColor: colors.Dark_primary,
  },

  bar: {
    width: "100%", // Full width
    height: 100,
    backgroundColor: "#FF5733",
    alignItems: "center", // Center the text horizontally
    // justifyContent: 'center', // Center the text vertically
    //paddingVertical: 10,
    flexDirection: "row",
    //paddingHorizontal:100,
    //paddingLeft:35,
    paddingTop: 40,
    paddingStart: 20,
  },
  texts: {
    color: "#fff",
    justifyContent: "center",
  },
  dividor: {
    backgroundColor: colors.Dark_secondary,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  book: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: 150,
  },
});
