
import { StyleSheet, Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import colors from '../../../styles/color';
import { useAuth, useUser } from '@clerk/clerk-expo';
import UserImage from '../../../Componens/bookpage/userprofileImage';
import { GetUserDataByClerk } from '../../../Actions/user';
import { useEffect, useState } from 'react';
import { SquarePen  , X} from 'lucide-react-native';
import { Switch } from 'react-native-paper';


const NotificationsSettings = () => {

    const [notifications, setNotifications] = useState(true);
    const [newcomment, setNewcomment] = useState(true);
    const [newfollow, setNewfollow] = useState(true);
    const [newbook, setNewbook] = useState(true);



    const onToggleNotifications = () => setNotifications(!notifications);
    const onToggleComment = () => setNewcomment(!newcomment);
    const onToggleFoloow = () => setNewfollow(!newfollow);
    const onToggleBook = () => setNewbook(!newbook);

    



    // useEffect(() => {
    //     const fetchUserData = async () => {
    //       setLoading(true);
    //       const { data, error } = await GetUserDataByClerk(userId);
    //       if (error) {
    //       } else {
    //         setUsername(data[0].name);  
    //         setEmail(data[0].email);  
    //       }
    //       setLoading(false);
    //     };
    
      
    //   }, []);




    return(
        <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>
           تلقي الاشعارات
          </Text>
          <View style={styles.imageContainer}>
                  <Switch value={notifications} onValueChange={onToggleNotifications} color={colors.special} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
             متابع جديد
          </Text>
          <View style={styles.imageContainer}>
                  <Switch value={newfollow} onValueChange={onToggleFoloow} color={colors.special} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
           تعليق جديد 
          </Text>
          <View style={styles.imageContainer}>
                  <Switch value={newcomment} onValueChange={onToggleComment} color={colors.special} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            كتاب جديد
          </Text>
          <View style={styles.imageContainer}>
                  <Switch value={newbook} onValueChange={onToggleBook} color={colors.special} />
          </View>
        </View>

      </View>

        


    )




};

const styles = StyleSheet.create({
    sectionContainer: {
      width: '100%',
      margin: 5,
    },
    row: {
        marginVertical:5,
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',  // Ensure space between text and image
    },
    text: {
      color: colors.sub_text,
      fontSize: 16,  // Adjust as needed
    },
    imageContainer: {
      marginLeft: 25,  // Add space between image and text
    },
    TextInput:{
       
        backgroundColor:colors.Dark_secondary ,
         height:30,
          width:'auto',
          minWidth:100,
          borderRadius:5,
          textAlign:"center",
          
    
      },
  });


export default NotificationsSettings;