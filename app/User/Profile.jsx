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
import {
  GanttChart,
  LayoutList,
  MessageSquareText,
  NotebookPen,
} from "lucide-react-native";
import UserLists from "../../Componens/profile/userLists";

const Profile = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  // const {userId } = useAuth();
  const [bookList, setBookList] = useState([]);
  const [time, setTime] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [profileColor, setProfileColor] = useState(null);
  const [pressedButton, setPressedButton] = useState("Button 1");

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };
  // console.log("userID:",userId)

  useEffect(() => {
    const fetchbooklist = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("Created , ImageURL")
        .eq("clerk_id", userId);

      if (error) {
        return;
      } else {
        setTime(data[0].Created);
        setAvatar(data[0].ImageURL);
        // console.log("image:", data[0].ImageURL);
      }
    };

    fetchbooklist();
  }, [userId]);

  return (
    <View
      style={{ backgroundColor: colors.Dark_primary, flex: 1, width: "100%" }}
    >
      <HeaderBar MainText={" المستخدم"} />

      <View
        style={{
          backgroundColor: profileColor || colors.Dark_secondary,
          alignSelf: "center",
          height: 200,
          width: "110%",
          alignItems: "center",
          justifyContent: "center",
        }}
        imageStyle={{}}
      >
        <UserImage clerk_id={userId} style={{ height: 70, width: 70 }} />
        <MyuserName clerk_id={userId} lefticon={true} />
        <View style={{ flexDirection: "row" }}>
          <TimeAgo timestamp={time} />
          {/* <Text style={{alignContent:'', fontSize:10 ,color:'rgba(225, 225, 225, 0.5)' , marginRight:15}}>الانضمام</Text> */}
        </View>
      </View>

      <View style={styles.container}>
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress("Button 1")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 1 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 1" && { color: colors.special },
              ]}
            >
              مراجعات
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
          <MessageSquareText
            color={
              pressedButton === "Button 1" ? colors.special : colors.sub_text
            }
          />
          {/* <GanttChart color={pressedButton === 'Button 1'? colors.special : colors.sub_text }  /> */}
        </Pressable>

        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress("Button 2")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 1 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 2" && { color: colors.special },
              ]}
            >
              قوائم
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
          <LayoutList
            color={
              pressedButton === "Button 2" ? colors.special : colors.sub_text
            }
            size={20}
          />
        </Pressable>

        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => handlePress("Button 3")}
        >
          <View style={{ flexDirection: "column", marginHorizontal: 1 }}>
            <Text
              style={[
                styles.buttonText,
                pressedButton === "Button 3" && { color: colors.special },
              ]}
            >
              كتب مؤلفة
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
          <NotebookPen
            color={
              pressedButton === "Button 3" ? colors.special : colors.sub_text
            }
            size={20}
          />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* {renderComponent()}*/}

        {pressedButton === "Button 1" && (
          <>
            <UserComments userid={userId} />
          </>
        )}
        {pressedButton === "Button 2" && (
          <>
            <View style={styles.DrawerDivider} />
            <UserLists userId={userId} />
          </>
        )}
        {pressedButton === "Button 3" && (
          <>
            <MyBookList user_id={userId} />
          </>
        )}
      </ScrollView>

      {/* 
            

            <ScrollView >

            <View style={{height:350 , width:'100%', backgroundColor:'white'}}>
                
                    <View style={styles.dividor}>
                              <Text style={{fontSize:15,color:'#fff', alignItems:'center'}}>تم تأليفها</Text>

                    </View>
                <MyBookList user_id={userId}/>

                <View style={styles.dividor}>


                  
                              <Text style={{fontSize:15,color:'#fff', alignItems:'center'}}>يقرأه لاحقا </Text>

                    </View>
                <Readlaetr user_id={userId}/>
                
                
  
  
              </View>
              <View style={styles.dividor}>
                              <Text style={{fontSize:15,color:'#fff', alignItems:'center'}}> المراجعات </Text>

                    </View>
           
                <UserComments userid={userId}/>
             


            </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  DrawerDivider: {
    height: 1,
    width: "90%",
    backgroundColor: colors.Dark_secondary,
    marginTop: 5,
    alignSelf: "center",
  },
});

export default Profile;

function undefined({ handlePress, pressedButton }) {
  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => handlePress("Button 1")}
      >
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 1,
          }}
        >
          <Text
            style={[
              styles.buttonText,
              pressedButton === "Button 1" && {
                color: colors.special,
              },
            ]}
          >
            مراجعات
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
        <MessageSquareText
          color={
            pressedButton === "Button 1" ? colors.special : colors.sub_text
          }
        />
        {/* <GanttChart color={pressedButton === 'Button 1'? colors.special : colors.sub_text }  /> */}
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => handlePress("Button 2")}
      >
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 1,
          }}
        >
          <Text
            style={[
              styles.buttonText,
              pressedButton === "Button 2" && {
                color: colors.special,
              },
            ]}
          >
            قوائم
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
        <LayoutList
          color={
            pressedButton === "Button 2" ? colors.special : colors.sub_text
          }
          size={20}
        />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => handlePress("Button 3")}
      >
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 1,
          }}
        >
          <Text
            style={[
              styles.buttonText,
              pressedButton === "Button 3" && {
                color: colors.special,
              },
            ]}
          >
            كتب مؤلفة
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
        <NotebookPen
          color={
            pressedButton === "Button 3" ? colors.special : colors.sub_text
          }
          size={20}
        />
      </Pressable>
    </>
  );
}
