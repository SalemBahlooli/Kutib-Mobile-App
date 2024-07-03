import { useSignIn, useAuth } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as SecureStore from "expo-secure-store";
import { supabase } from "../../hook/supabaseClient";
import { useAuthStatus } from "../../navigation/useAuthStatus";
import colors from "../../styles/color";

const Login = () => {
  const { isLoggedIn, updateLoggedInStatus } = useAuthStatus();

  const { signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const GoToRegister = () => {
    navigation.navigate("Register");
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
      console.error("An error occurred during sign-in:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <View style={styles.container}>
      {/* <View style={styles.overlay} /> */}
      <Spinner visible={loading} />

      <View style={styles.regester_container}>
        <View style={styles.RegisterLogo}>
          <Ionicons
            name="log-in"
            size={30}
            color={colors.special}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{ color: colors.special, fontSize: 25, fontWeight: "bold" }}
          >
            تسجيل الدخول
          </Text>
        </View>

        <TextInput
          autoCapitalize="none"
          placeholder="Kutib@Gamil.com"
          placeholderTextColor="rgba(255, 87, 51, 0.5)"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />

        <View
          style={[
            styles.inputField,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            },
          ]}
        >
          <TextInput
            placeholder="كلمة المرور"
            value={password}
            placeholderTextColor="rgba(255, 87, 51, 0.5)"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ width: 250, textAlign: "center" }}
          />
          {showPassword ? (
            <Ionicons
              name="eye"
              size={25}
              color={"rgba(255, 87, 51, 0.5)"}
              style={{ marginRight: 10 }}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={25}
              color={"rgba(255, 87, 51, 0.5)"}
              style={{ marginRight: 10 }}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 5, paddingBottom: 20 }}>
          <BouncyCheckbox
            isChecked={showPassword}
            onPress={() => setShowPassword(!showPassword)}
            size={20}
            style={{ marginLeft: 90 }}
            fillColor="rgba(255, 87, 51, 0.5)"
          />
          <Text style={{ color: colors.special }}>إظهار كلمة المرور</Text>
        </View>
        <Pressable onPress={onSignInPress}>
          <View style={styles.button}>
            <Text style={{ fontSize: 15, color: "white" }}>تسجيل الدخول</Text>
          </View>
        </Pressable>

        <Pressable style={styles.text}>
          <Text style={{ color: "white" }}>نسيت كلمة مرورك؟</Text>
        </Pressable>

        <Pressable style={styles.text} onPress={GoToRegister}>
          <Text style={{ color: "white" }}>حساب جديد</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.Dark_primary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value (0.5 for 50% transparency)
  },
  regester_container: {
    backgroundColor: colors.Dark_secondary,
    padding: 10,
    borderRadius: 20,
    height: 400,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#FF5733",
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  button: {
    margin: 20,
    alignItems: "center",
    backgroundColor: colors.special,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    marginLeft: 50,
    marginRight: 50,
    //borderWidth: 2,
    //borderColor:"rgba(0, 0, 0, 0.3)",
  },
  RegisterLogo: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,

    marginRight: 12,
  },
});

export default Login;
