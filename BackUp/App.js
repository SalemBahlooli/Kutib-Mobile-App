import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar ,Icon, MD3Colors , } from 'react-native-paper';
import library from './Pages/library/library'

const Stack = createNativeStackNavigator();




export default function App() {

  const handleClick = () => {
    alert('ثمالة الذكريات');
  };
  

  
  return (

     

    
    <View style={styles.container}>
      <View style={styles.bar}>
        <Pressable  onPress={handleClick} style={{flex:1}}>
             <Avatar.Icon style={{backgroundColor: '#FF5733', alignItems:'stretch'}} size={50} icon="book-search" onPress={() => console.log('Pressed')} />
        </Pressable>
            <Text style={{color:'#fff', fontSize:20, flex:1,paddingLeft:40,}}>الرئيسية</Text> 
            <Avatar.Icon style={{backgroundColor:'#FF5733',flex:1,alignItems:'flex-end',paddingRight:20,}} size={50} icon="menu" onPress={() => console.log('Pressed')} />
            
      </View>
      












      <View style={styles.dividor}>
        <Text style={{fontSize:15,color:'#fff', alignItems:'center'}}>
          الاكثر رواجاً
        </Text>

      </View>
      
      <ScrollView style={styles.book} horizontal={true}>
        <Pressable onPress={handleClick}>
          <Image style={{height:150, width:110}} 
        source={{
          uri: 'https://m.media-amazon.com/images/I/51RsBSYneYL._SY466_.jpg',
        }}
      />
        </Pressable>
         
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183408101534208010/safah.png?ex=658839ae&is=6575c4ae&hm=919eb7710dc9f58670d4ea54833ce35ae2ea7ddca6b147143f6983a2b8a99d60&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183408985961934930/IMG_3745.JPG?ex=65883a80&is=6575c580&hm=a9e22f3184ab46afb3cff1b21ea906f5ead2245ed74f02d293e7b23291d2b31f&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183412431473610824/2023-12-10_171750.jpg?ex=65883db6&is=6575c8b6&hm=1fd092486669459c73d5682af29a91c5edf42ffdec2bb83de4cd3284e8902091&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183412431473610824/2023-12-10_171750.jpg?ex=65883db6&is=6575c8b6&hm=1fd092486669459c73d5682af29a91c5edf42ffdec2bb83de4cd3284e8902091&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183412431473610824/2023-12-10_171750.jpg?ex=65883db6&is=6575c8b6&hm=1fd092486669459c73d5682af29a91c5edf42ffdec2bb83de4cd3284e8902091&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183412431473610824/2023-12-10_171750.jpg?ex=65883db6&is=6575c8b6&hm=1fd092486669459c73d5682af29a91c5edf42ffdec2bb83de4cd3284e8902091&',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://cdn.discordapp.com/attachments/1163689186176532502/1183412431473610824/2023-12-10_171750.jpg?ex=65883db6&is=6575c8b6&hm=1fd092486669459c73d5682af29a91c5edf42ffdec2bb83de4cd3284e8902091&',
        }}
      />
         
        
      
        
      </ScrollView>
      <View style={styles.dividor}>
        <Text style={{fontSize:15,color:'#fff', alignItems:'center'}}> الأعلى تقييماً</Text>

      </View>

      <View style={styles.book}>
         <Image style={{height:150, width:110,}}
        source={{
          uri: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-pp-mrh-4-thy-fathers-house.jpg',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-joc-madeira-spunge.jpg',
        }}
      />
      <Image style={{height:150, width:110, marginLeft:3,}}
         source={{
          uri: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-km-1-godhead.jpg',
        }}
      />
        
      </View>





    
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   // flex: 0 ,
    backgroundColor: '#191919',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  bar: {
    width: '100%', // Full width
    height:100 ,
    backgroundColor: '#FF5733',
    alignItems: 'center', // Center the text horizontally
    // justifyContent: 'center', // Center the text vertically
    //paddingVertical: 10,
    flexDirection: 'row',
    //paddingHorizontal:100,
    //paddingLeft:35,
    paddingTop:40,
    paddingStart:20,
  },
  texts:{
    color: '#fff',
    justifyContent: 'center',

  },
  dividor:{
    backgroundColor:'#5B5B5B',
    height:25,
    justifyContent: 'center',
    alignItems:'center',


  },
  book:{
    flexDirection: 'row',
   backgroundColor:"#000",
   height:150,

  }
});