
import { StyleSheet, Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import colors from '../../../styles/color';
import { useAuth, useUser } from '@clerk/clerk-expo';
import UserImage from '../../../Componens/bookpage/userprofileImage';
import { GetUserDataByClerk } from '../../../Actions/user';
import { useEffect, useState } from 'react';
import { AtSign, Instagram, Send, SquarePen  , X} from 'lucide-react-native';
import { Switch } from 'react-native-paper';



const ContactUs = () => {

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
         
          <View style={styles.imageContainer}>
                <Instagram color={colors.special} size={30}   />
                  
          </View>
          <View style={styles.imageContainer}>
                <AtSign color={colors.special} size={30}   />
          </View>
          <View style={styles.imageContainer}>
                <Send color={colors.special} size={30}   />
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
        flexDirection:'row',
         alignItems: 'center',
         justifyContent: 'center',
    },
    text: {
      color: colors.sub_text,
      fontSize: 16,  
    },
    imageContainer: {
       
        alignItems:'center',
        marginHorizontal:10,
        justifyContent: 'center',
     
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


export default ContactUs;