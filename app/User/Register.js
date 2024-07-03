import { Button, TextInput, View, StyleSheet , Text, Pressable   } from 'react-native';
import { useSignUp ,SignedOut , useUser , useAuth } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';
import { clerk } from '@clerk/clerk-expo/dist/singleton';
import { supabase } from '../../hook/supabaseClient';


const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {  isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  

  const navigation = useNavigation();

  const [fetchError, setFetchError] = useState(null);
  const [users, setUsers] = useState(null);


  

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    if (password === confirmPassword) {
      // Passwords match, proceed with signup
      console.log('Passwords match. Proceed with signup.');
      try {
        await signUp.create({
          username:username,
          emailAddress,
          password
          
        });
        
   
        // send the email.
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        

            // change the UI to verify the email address
            setPendingVerification(true);
          } catch (err) {
            alert(err);
          } finally {
            setLoading(false);
          }

    } else {
      // Passwords do not match, handle accordingly
      console.log('Passwords do not match. Handle accordingly.');
      alert("كلمة المرور غير متطابقة")
      setLoading(false);
    }

    
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
 
      await setActive({ session: completeSignUp.createdSessionId});
      console.log("Acount crated !!");
      console.log('completeSignUp: ', signUp);
      setPendingVerification(false);

    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
     <View style={styles.overlay} />
      
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
   <View style={styles.regester_container}>

    <View style={styles.RegisterLogo}>
    <Ionicons name="person-add" size={30} color="white" style={{marginRight:10}}/>
    <Text style={{color:'white' , fontSize:25 , fontWeight:'bold'}}>حساب جديد</Text>

    </View>

                     <View>
                    <TextInput autoCapitalize="none" placeholder="Kutib@gmail.com :مثال"  placeholderTextColor="rgba(0, 0, 0, 0.5)" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />

                  </View>
                     <View>
                    <TextInput autoCapitalize="none" placeholder="@Kutib :مثال"  placeholderTextColor="rgba(0, 0, 0, 0.5)" value={username} onChangeText={setUsername} style={styles.inputField} />

                  </View>

            <View style={{marginTop:30}}>
                    <View>
                    <TextInput placeholder="كلمة مرور" value={password}  placeholderTextColor="rgba(0, 0, 0, 0.5)" onChangeText={setPassword}  style={styles.inputField}  secureTextEntry={!showPassword} />
                   </View>
         
                    <View>
                      <TextInput placeholder="تأكيد كلمة المرور" value={confirmPassword} placeholderTextColor="rgba(0, 0, 0, 0.5)" onChangeText={setConfirmPassword}   style={styles.inputField} secureTextEntry={!showPassword}/>
                      <View style={{flexDirection:'row' , marginTop:5}}>
                        <BouncyCheckbox isChecked={showPassword} onPress={() => setShowPassword(!showPassword)} size={20} style={{ marginLeft: 90 }} fillColor='rgba(0, 0, 0, 0.5)'/>
                        <Text style={{color:'white'}}>إظهار كلمة المرور</Text>
                      </View>
                      




                    </View>
            </View>

                  
            <Pressable onPress={onSignUpPress}>
            <View style={styles.button}>
                  <Text style={{fontSize:15,}}> تسجيل</Text>
            </View>
          </Pressable>
         
   </View>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
          </View>
          <Pressable onPress={onPressVerify}>
            <View style={styles.button}>
            <Text style={{fontSize:15,}}> تحقق</Text>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#FF5733'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 for 50% transparency)
  },

  regester_container: {
    backgroundColor:'#FF5733',
    padding:10,
    borderRadius:20,
    height:400,
    
    
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#FF5733',
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#fff',
   textAlign:'center',
  },
  button: {
    margin: 20,
    alignItems: 'center',
    backgroundColor:'white',
    height:50,
    borderRadius: 30,
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:50,
    marginRight:50,
    //borderWidth: 2,
    //borderColor:"rgba(0, 0, 0, 0.3)",

    
  },
  RegisterLogo: {
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:30,
    marginTop:10,
    
  },
});

export default Register;
