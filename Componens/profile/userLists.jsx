import React, { useState, useEffect } from "react";
import {
  Platform,
  Linking,
  Text,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../styles/color";
import HeaderBar from "../../Componens/public/headerBar";
import { useAuth } from "@clerk/clerk-expo";
import UserImage from "../../Componens/bookpage/userprofileImage";
import MyuserName from "../../Componens/public/myusername";
import Book_list from "../../Componens/public/public-book-list";
import Readlaetr from "../../Componens/home/ReadLater";
import MyBook_list from "../../Componens/public/public-mybook-list";
import UserComments from "../../Componens/profile/comments";
import MyBookList from "../../Componens/public/public-mybook-list";
import { supabase } from "../../hook/supabaseClient";
import TimeAgo from "../../Componens/bookpage/commets_time";
import { LinearGradient } from "expo-linear-gradient";
import {
  BookCheck,
  BookHeart,
  BookPlus,
  GanttChart,
  LayoutList,
  Lock,
  NotebookPen,
} from "lucide-react-native";
import { getPrivacyDataOfUser } from "../../Actions/Settings/Settings";
import {
  getUserDoneListsData,
  getUserReadLaterListsData,
  getUserfavoriteListsData,
} from "../../Actions/user";
import UserReadLaterList from "../../app/User/Profile/ReadLaterlist";

const UserLists = ({ data, userId }) => {
  const route = useRoute();
  //   const { userId } = route.params;
  const navigation = useNavigation();
  // const {userId } = useAuth();
  const [bookList, setBookList] = useState([]);
  const [time, setTime] = useState(null);
  const [pressedButton, setPressedButton] = useState("");
  const [favorite, setFavorite] = useState(true);
  const [later, setLater] = useState(true);
  const [done, setDone] = useState(true);
  const [favoritedata, setFavoritedata] = useState(null);
  const [laterdata, setLaterdata] = useState(null);
  const [donedata, setDonedata] = useState(null);

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  useEffect(() => {
    const fetchPrivacyData = async () => {
      const { data, error } = await getPrivacyDataOfUser(userId);
      // console.log('Data:',data ,"Error:",error)
      setFavorite(data[0].FavoriteLits);
      setLater(data[0].LaterList);
      setDone(data[0].ReadedList);
    };
    const fetchlistData = async () => {
      const readlater = await getUserReadLaterListsData(userId);
      // console.log('Data:',result ,"Error:",result.error)
      setLaterdata(readlater);

      const favorite = await getUserfavoriteListsData(userId);
      // console.log('Data:',result ,"Error:",result.error)
      setFavoritedata(favorite);

      const done = await getUserDoneListsData(userId);
      // console.log("🚀 ~ fetchlistData ~ done:", done);

      setDonedata(done);
    };

    fetchPrivacyData();
    fetchlistData();
  }, [data, userId]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress(later && "Button 1")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 5 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 1" &&
                  done && { color: colors.special },
              ]}
            >
              اقراه لاحقاً
            </Text>
            {pressedButton === "Button 1" && (
              <View
                style={{
                  backgroundColor: colors.special,
                  height: 2,
                  marginTop: 5,
                }}
              />
            )}
          </View>
          {later ? (
            <BookPlus
              color={
                pressedButton === "Button 1" ? colors.special : colors.sub_text
              }
            />
          ) : (
            <Lock
              color={
                pressedButton === "Button 1" ? colors.sub_text : colors.sub_text
              }
            />
          )}
        </Pressable>

        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress(done && "Button 2")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 5 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 2" &&
                  done && { color: colors.special },
              ]}
            >
              تمت قرائته
            </Text>
            {pressedButton === "Button 2" && (
              <View
                style={{
                  backgroundColor: colors.special,
                  height: 2,
                  marginTop: 5,
                }}
              />
            )}
          </View>
          {done ? (
            <BookCheck
              color={
                pressedButton === "Button 2" ? colors.special : colors.sub_text
              }
              size={20}
            />
          ) : (
            <Lock
              color={
                pressedButton === "Button 2" ? colors.sub_text : colors.sub_text
              }
            />
          )}
        </Pressable>

        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress(favorite && "Button 3")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 5 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 3" &&
                  favorite && { color: colors.special },
              ]}
            >
              المفضلة{" "}
            </Text>
            {pressedButton === "Button 3" && (
              <View
                style={{
                  backgroundColor: colors.special,
                  height: 2,
                  marginTop: 5,
                }}
              />
            )}
          </View>
          {favorite ? (
            <BookHeart
              color={
                pressedButton === "Button 3" ? colors.special : colors.sub_text
              }
              size={20}
            />
          ) : (
            <Lock
              color={
                pressedButton === "Button 3" ? colors.sub_text : colors.sub_text
              }
            />
          )}
        </Pressable>
      </View>

      {/* {renderComponent()}*/}

      {pressedButton === "Button 1" && (
        <>
          <UserReadLaterList data={laterdata} />
        </>
      )}
      {pressedButton === "Button 2" && (
        <>
          <UserReadLaterList data={donedata} />
        </>
      )}
      {pressedButton === "Button 3" && (
        <>
          <UserReadLaterList data={favoritedata} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dividor: {
    backgroundColor: colors.Dark_secondary,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.Dark_primary,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 7,
    marginBottom: 7,
    paddingHorizontal: 15,
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },

  buttonText: {
    color: colors.sub_text,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default UserLists;
