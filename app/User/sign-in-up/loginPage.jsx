// screens/LoginPage.js
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { Button, FlatList, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../../styles/color";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const LoginPage = () => {
  const { signIn, setActive } = useSignIn();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const GoToRegister = () => {
    navigation.navigate("SignUpPage");
    //console.log("Clerk_Session:",sessionId);
  };

  const onSignInPress = async () => {
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      handleLoginAllert(err.errors[0].message);
      // console.error(err.errors[0].message);
      // console.error('An error occurred during sign-in:', err.message);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  const handleLoginAllert = (message) => {
    // Open the bookUrl in the device's default browsers
    Toast.show({
      type: "error",
      text1: "خطأ في تسجيل الدخول",
      text2: message,
      position: "bottom",
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background-lightDark.png")}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <View
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100%",
          }}
        >
          <View style={styles.RegisterLogo}>
            <Ionicons
              name="log-in"
              size={30}
              color={colors.special}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: colors.special,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              تسجيل الدخول
            </Text>
          </View>

          {loading ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator animating={loading} color={colors.special} />
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Kutib@Gamil.com"
                placeholderTextColor={colors.sub_text}
                onChangeText={setEmailAddress}
                value={emailAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="كلمة المرور"
                placeholderTextColor={colors.sub_text}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
              />
              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                <BouncyCheckbox
                  isChecked={showPassword}
                  onPress={() => setShowPassword(!showPassword)}
                  size={20}
                  fillColor="rgba(255, 87, 51, 0.5)"
                />
                <Text style={{ color: colors.sub_text }}>
                  إظهار كلمة المرور
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => onSignInPress()}
              >
                <Text style={styles.buttonText}>تسجيل الدخول</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ alignItems: "baseline" }}
                  onPress={() => GoToRegister()}
                >
                  <Text style={[styles.signUpText, { color: colors.special }]}>
                    حساب جديد
                  </Text>
                </TouchableOpacity>
                <Text style={styles.signUpText}>ماعندك حساب ؟!</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ alignItems: "baseline" }}
                  // onPress={() => }
                >
                  <Text style={[styles.signUpText, { color: colors.special }]}>
                    نسيت كلمة المرور
                  </Text>
                </TouchableOpacity>
                <Text style={styles.signUpText}> نسيت الباسوورد ياهطف؟</Text>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Dark_primary,
  },
  imageContainer: {
    height: 100,
    marginBottom: 20,
  },
  image: {
    width,
    height: 100,
    resizeMode: "contain",
  },
  logo: {
    alignSelf: "center",
    marginVertical: 20,
    height: 50,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
    color: colors.Main_Text,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.special,
    borderStyle: "dashed",
    textAlign: "left",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    color: "#aaa",
    marginLeft: 10,
  },
  button: {
    width: "60%",
    borderWidth: 2,
    borderColor: colors.special,
    borderStyle: "dashed",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.special,
    fontSize: 16,
  },
  signUpText: {
    color: "#aaa",
    marginTop: 20,
    marginHorizontal: 5,
  },
  RegisterLogo: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
  },
});
export default LoginPage;
