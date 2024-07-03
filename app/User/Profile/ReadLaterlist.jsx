
import { StyleSheet, Text, View , FlatList , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import colors from '../../../styles/color';
import { useAuth, useUser } from '@clerk/clerk-expo';
import UserImage from '../../../Componens/bookpage/userprofileImage';
import { GetUserDataByClerk } from '../../../Actions/user';
import { useEffect, useState } from 'react';
import { SquarePen  , X} from 'lucide-react-native';
import { Switch } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';




const UserReadLaterList = ({data}) => {
    const navigation = useNavigation();


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
    const handlePress = (book) => {
        // Navigate to the "Book" screen with the book ID
        navigation.navigate('Book', { book });
      };

    if(!data){
        return(<View style={{alignItems:'center' , justifyContent:'center', marginTop:100}}>
             <Text style={{color:colors.sub_text}}>
            لاتوجد كتب في القائمة
        </Text>
        </View>
        )
        
    }


    return (

        <ScrollView style={{height:'auto'}}>
          {data.map((item) => (
            <Pressable key={item.id} onPress={() => handlePress(item)}>
              <View style={{ height: 'auto', borderRadius: 8, marginTop: 3, paddingHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', direction: 'rtl' }}>
                  <View>
                    <Image
                      style={styles.bookimage}
                      source={{ uri: item.URLImage }}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 3, marginTop: 10, alignItems: 'center' }}>
                    <Text style={styles.nametext}>{item.name}</Text>
                    <Text style={styles.authortext}>{item.author}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 10 }}>
                      <StarRating disabled={true} maxStars={1} rating={1} starSize={15} fullStarColor={'rgba(255, 123, 0 , 0.5)'} starStyle={{ marginRight: 3 }} />
                      <Text style={{ color: 'rgba(255, 123, 0, 0.5)' }}>{item.rate.toFixed(1)}</Text>
                    </View>
                    <Text numberOfLines={3} style={styles.destext}>{item.description}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.DrawerDivider} />
            </Pressable>
          ))}
          

        </ScrollView>
        
      );



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
      bookimage: {
        height: 130, width: 86, marginTop: 10, marginLeft: 5 , resizeMode:'cover',
    },
    nametext:{
        marginTop: 5, fontSize: 20 , color:'white' , alignSelf:"flex-start",marginLeft:10
    },
    destext:{
        marginTop: 5, fontSize: 20 , color:'#bfbfbf' , textAlign: 'center', alignItems:'center', fontSize:13, marginBottom:5,
    },
    authortext:{
        marginTop: 5, fontSize: 15 , color:'#bfbfbf' , alignSelf:"flex-start",marginLeft:10
    },
    DrawerDivider:{
        height: 1, width: '90%', backgroundColor:colors.Dark_secondary,   marginTop:5, alignSelf:'center'

       },
  });


export default UserReadLaterList;