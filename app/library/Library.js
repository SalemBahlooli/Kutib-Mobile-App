import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable  , RefreshControl } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar , Searchbar } from 'react-native-paper';
import Searchbyname from '../../Componens/library/searchbyname';
import AllBooks from '../../Componens/library/allBooks';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,  useEffect } from 'react';
import SearchBycontent from '../../Componens/library/searchBycontent';
import SearchTab from '../../Componens/library/SearchTab';
import HeaderBar from '../../Componens/public/headerBar';


export default function Library() {

  const navigation = useNavigation();
 const [searchQuery, setSearchQuery] = useState('');
 
 


  const openDrawer = () => {
    navigation.openDrawer();
  };
  const goBack = () => {
    navigation.goBack()
  };


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // You can perform any necessary actions here when searchQuery changes
    // For example, fetching data based on the search query
    // This effect will re-run whenever searchQuery changes
    
  }, [searchQuery]);
  
  
  
  return (

     
    <View style={styles.container}>
      
      <HeaderBar  MainText={"المكتبة"}/>
      <View style={{backgroundColor:'#191919' , height:60, marginTop:5}} >
           <Searchbar 
           placeholder="ابحث هنا"
           style={{ backgroundColor: '#212121' }}
           value={searchQuery}
           onChangeText={handleSearch}
           
            />
      </View>
     
      
       <SearchTab search={searchQuery} />
       

      {/* {searchQuery === '' ? (
        <AllBooks />
      ) : (
        <View>
    
           <Searchbyname key="searchbyname"  search={searchQuery} />
           <SearchBycontent key="searchbycontent"  search={searchQuery} />

           </View>
      )} */}
       
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#191919',
    
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