
import { StyleSheet,Vibration , Text, View , Image ,ImageBackground, Pressable , Linking , Alert , Modal , ScrollView ,  RefreshControl , KeyboardAvoidingView , TextInput} from 'react-native';
import colors from '../../../styles/color';
import { Cog } from 'lucide-react-native';
import AccountSettings from './Account';
import NotificationsSettings from './notifications';
import ContactUs from './ContactUs';
import PrivacySettings from './Privacy';



export default function Settings() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
        <View style={styles.iconContainer}>
          <Cog size={120} color={colors.special} />
        </View>
        <Text style={styles.title}>
          الأعدادات
        </Text>

        <Text style={{color:'white' }}>
                     v1.0.0

                    </Text>
                    <Text style={{color:colors.sub_text , fontSize:11 }}>
                     Beta نسخة تجريبية

                    </Text>
  
        <View style={styles.menuContainer}>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              الحساب
            </Text>
                    <AccountSettings/>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              الخصوصية
            </Text>
              <PrivacySettings/>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              الإشعارات
            </Text>
                  <NotificationsSettings/>
            
          </View>
        
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              تواصل
            </Text>
                  <ContactUs/>
          </View>
          <View style={styles.menuItem}>
            
          </View>
          
        </View>
  
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.Dark_primary,  // Adjust to your background color
    },
    iconContainer: {
      height: 120,
      marginTop: 50,
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      marginVertical: 30,
    },
    menuContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
    menuItem: {
      alignItems: 'flex-end',
      marginTop: 30,

    },
    menuText: {
      color: 'white',
      fontSize: 18,
      fontWeight:'bold',
    },
  });
