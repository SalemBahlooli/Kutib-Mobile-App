import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export const handlesignUpAllert = (message) => {
  // Open the bookUrl in the device's default browsers
  Toast.show({
    type: "error",
    text1: "خطأ في انشاء حساب ",
    text2: message,
    position: "bottom",
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export const handleImagePick = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri; // Adjusted to use result.assets[0].uri
    } else {
      console.log("Image selection cancelled");
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
};
