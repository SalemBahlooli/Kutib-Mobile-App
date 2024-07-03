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
import colors from "../../../styles/color";
import { useNavigation } from "@react-navigation/native";

export const InfoInput = ({
  emailAddress,
  setEmailAddress,
  username,
  setUsername,
  showPassword,
  setShowPassword,
  setPassword,
  setConfirmPassword,
  onSignUpPress,
}) => {
  const navigation = useNavigation();

  const GoToLogin = () => {
    navigation.navigate("LoginPage");
    //console.log("Clerk_Session:",sessionId);
  };

  return (
    <>
      <View style={styles.RegisterLogo}>
        <Ionicons
          name="person-add"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: colors.special,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          حساب جديد
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="الايميل"
        placeholderTextColor={colors.sub_text}
        onChangeText={setEmailAddress}
        value={emailAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="اسم المستخدم"
        placeholderTextColor={colors.sub_text}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        placeholderTextColor={colors.sub_text}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="اعد كلمة المرور"
        placeholderTextColor={colors.sub_text}
        secureTextEntry={!showPassword}
        onChangeText={setConfirmPassword}
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
        <Text style={{ color: colors.sub_text }}>إظهار كلمة المرور</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onSignUpPress()}>
        <Text style={styles.buttonText}>التالي </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <TouchableOpacity
          style={{ alignItems: "baseline" }}
          onPress={() => GoToLogin()}
        >
          <Text style={[styles.signUpText, { color: colors.special }]}>
            تسجيل الدخول
          </Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}> عندك حساب ؟</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  RegisterLogo: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
});
