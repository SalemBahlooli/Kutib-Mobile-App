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
  Pressable,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { Button, FlatList, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../../styles/color";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import { handleImagePick, handlesignUpAllert } from "./actions";
import { InfoInput } from "./infoInput";
import { ConfirmCode } from "./confirmCode";

const { width } = Dimensions.get("window");

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("poyipa5850@joeroc.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("poyipa");
  const [avatar, setAvatar] = useState("");

  const pickImage = async () => {
    const uri = await handleImagePick();
    if (uri) {
      setAvatar(uri);
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    if (!password) {
      handlesignUpAllert("الرجاء ادخال كلمة مرور ");
      setLoading(false);
      return;
    }
    setLoading(true);

    if (password !== confirmPassword) {
      handlesignUpAllert("كلمة المرور غير متطابقة");
      setLoading(false);
      return;
    }
    try {
      await signUp.create({
        username: username,
        emailAddress,
        password,
        image_url: avatar,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err) {
      handlesignUpAllert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      console.log("Acount crated !!");
      console.log("completeSignUp: ", signUp);
      setPendingVerification(false);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background-signUp.png")}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <ScrollView>
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50%",
            }}
          >
            <Pressable onPress={() => pickImage()} style={styles.pickimage}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.selectedImage} />
              ) : (
                <Ionicons name="image" size={30} color="white" />
              )}
            </Pressable>

            {loading ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator animating={loading} color={colors.special} />
              </View>
            ) : !pendingVerification ? (
              <>
                <InfoInput
                  emailAddress={emailAddress}
                  setEmailAddress={setEmailAddress}
                  username={username}
                  setUsername={setUsername}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  onSignUpPress={onSignUpPress}
                />
              </>
            ) : (
              <>
                <ConfirmCode
                  username={username}
                  emailAddress={emailAddress}
                  setCode={setCode}
                  onPressVerify={onPressVerify}
                />
              </>
            )}
          </View>
        </ScrollView>
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
    textAlign: "right",
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
    marginTop: 10,
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
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  pickimage: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: colors.special,
    borderStyle: "dashed",
    alignSelf: "center",
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignUpPage;
