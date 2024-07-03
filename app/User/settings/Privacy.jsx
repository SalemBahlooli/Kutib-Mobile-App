import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Linking,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import colors from "../../../styles/color";
import { useAuth, useUser } from "@clerk/clerk-expo";
import UserImage from "../../../Componens/bookpage/userprofileImage";
import { GetUserDataByClerk } from "../../../Actions/user";
import { useEffect, useState } from "react";
import { SquarePen, X } from "lucide-react-native";
import { Switch } from "react-native-paper";
import {
  UpdatePrivacyDataOfUser,
  getPrivacyDataOfUser,
} from "../../../Actions/Settings/Settings";

const PrivacySettings = () => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const [later, setLater] = useState(null);
  const [done, setDone] = useState(null);

  const onToggleFavorite = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await UpdatePrivacyDataOfUser(
        userId,
        !favorite,
        later,
        done
      );
      console.log("Data:", data, "Error:", error);

      if (error) {
        throw new Error(error);
      }

      setFavorite(data[0].FavoriteLits);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggleLater = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await UpdatePrivacyDataOfUser(
        userId,
        favorite,
        !later,
        done
      );

      if (error) {
        throw new Error(error);
      }

      setLater(data[0].LaterList);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggleReadedList = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await UpdatePrivacyDataOfUser(
        userId,
        favorite,
        later,
        !done
      );
      //   console.log('Data:', data, "Error:", error);

      if (error) {
        throw new Error(error);
      }

      setDone(data[0].ReadedList);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrivacyData = async () => {
      const { data, error } = await getPrivacyDataOfUser(userId);
      // console.log('Data:',data ,"Error:",error)
      setFavorite(data[0].FavoriteLits);
      setLater(data[0].LaterList);
      setDone(data[0].ReadedList);
    };

    fetchPrivacyData();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>اظهار قائمة المفضلة</Text>
        <View style={styles.imageContainer}>
          <Switch
            value={favorite}
            onValueChange={onToggleFavorite}
            color={colors.special}
            disabled={isLoading}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>اظهار قائمة المشاهدة لاحقاً</Text>
        <View style={styles.imageContainer}>
          <Switch
            value={later}
            onValueChange={onToggleLater}
            color={colors.special}
            disabled={isLoading}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>اظهار قائمة تمت مشاهدته</Text>
        <View style={styles.imageContainer}>
          <Switch
            value={done}
            onValueChange={onToggleReadedList}
            color={colors.special}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    margin: 5,
  },
  row: {
    marginVertical: 5,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between", // Ensure space between text and image
  },
  text: {
    color: colors.sub_text,
    fontSize: 16, // Adjust as needed
  },
  imageContainer: {
    marginLeft: 25, // Add space between image and text
  },
  TextInput: {
    backgroundColor: colors.Dark_secondary,
    height: 30,
    width: "auto",
    minWidth: 100,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default PrivacySettings;
