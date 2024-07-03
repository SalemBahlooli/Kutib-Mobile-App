import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../../../styles/color";

export const ConfirmCode = ({
  username,
  emailAddress,
  setCode,
  onPressVerify,
}) => {
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...codeArray];
    newCode[index] = text;
    setCodeArray(newCode);

    // Combine the array into a single string and pass it to setConfirmCode
    setCode(newCode.join(""));

    // Move to the next input field if the current one is filled
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to the previous input field if the current one is empty
    if (e.nativeEvent.key === "Backspace" && !codeArray[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: colors.sub_text }}>@{username}</Text>
      </View>
      <View
        style={{
          marginTop: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: colors.sub_text }}>
          ادخل رمز التحقق الذي تم ارساله الى : {emailAddress}
        </Text>
      </View>

      <View style={styles.container}>
        {codeArray.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputs.current[index] = input)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={() => onPressVerify()}>
          <Text style={styles.buttonText}>تأكيد </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.special,
    fontSize: 16,
  },
  input: {
    height: 50,
    width: "14%", // Adjusted width to fit 6 slots with some spacing
    marginBottom: 20,
    paddingHorizontal: 10,
    color: colors.Main_Text,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.special,
    borderStyle: "dashed",
    textAlign: "center",
    fontSize: 18,
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
});
