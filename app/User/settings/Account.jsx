
import { StyleSheet, Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import colors from '../../../styles/color';
import { useAuth, useUser } from '@clerk/clerk-expo';
import UserImage from '../../../Componens/bookpage/userprofileImage';
import { GetUserDataByClerk } from '../../../Actions/user';
import { useEffect, useState } from 'react';
import { SquarePen  , X} from 'lucide-react-native';


const AccountSettings = () => {

    const {userId}= useAuth();
    const { user, updateUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        const fetchUserData = async () => {
          setLoading(true);
          const { data, error } = await GetUserDataByClerk(userId);
          if (error) {
          } else {
            setUsername(data[0].name);  
            setEmail(data[0].email);  
          }
          setLoading(false);
        };
    
        fetchUserData();
      }, [userId]);


     const changeEditState =()=>{
        if(edit){
           setEdit(false) ;
           setNewUsername('');
        }else{
            setEdit(true);
        }
     }
     const UpdateUserName = async ()=>{
        setLoading(true);

        try{
          const {data , error} = await user.update({ username: newUsername });
          setEdit(false);

          if(error){
            console.error('Failed to update username:', error);

          }



        }catch (error) {
            console.error('Catch: Failed to update username:', error.response);
           
          }finally{
            setLoading(false);
            setEdit(false);
            setNewUsername('');



          }


        
     }

    return(
        <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>
            صورة الحساب
          </Text>
          <View style={styles.imageContainer}>
            <UserImage clerk_id={userId} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            اسم المستخدم
          </Text>
          <View style={{alignItems:'flex-start' , flexDirection:'row'}}>

            <TextInput      
                            style={styles.TextInput}
                            placeholder={`@${username}`}
                            placeholderTextColor={colors.sub_text}
                            color={colors.sub_text} 
                            editable={edit && !loading}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            onSubmitEditing={()=>UpdateUserName()}
                            numberOfLines={1}
                            textContentType='username'
                            textAlignVertical="center"
                            
                            
                />

                <Pressable onPress={()=> changeEditState()} style={{alignSelf:'center' ,marginHorizontal:10}}>
                    {edit? 
                    <X size={20} color={colors.red_error}/>
                    :
                    <SquarePen size={20} color={colors.special}/>  
                }

                </Pressable>



          </View>
         
         
         
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            الأيميل 
          </Text>
          <View style={{alignItems:'flex-start' , flexDirection:'row'}}>

            <TextInput      
                            style={styles.TextInput}
                            placeholder={email}
                            placeholderTextColor={colors.sub_text}
                            color={colors.sub_text} 
                            editable={false}
                            numberOfLines={1}
                            textContentType='emailAddress'
                            textAlignVertical="center"
              
                />
          </View>
         

         
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            كلمة المرور
          </Text>
          <View style={{alignItems:'flex-start' , flexDirection:'row'}}>

            <Text style={{color:colors.special , alignSelf:'center'}}>
              تغيير كلمة المرور
            </Text>
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
        marginVertical:10,
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


export default AccountSettings;