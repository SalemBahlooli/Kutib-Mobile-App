import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const selectImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [530, 800],
      quality: 1,
    });

    if (!result.canceled) {
        const { uri } = result.assets[0];
        const fileName = "SALEM";
        const type = 'image/jpeg'; // Assuming jpeg, adjust if necessary
        return { uri, type, fileName };
      }
  } catch (error) {
    console.log('Error picking image: ', error);
  }
};
