import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable  , RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,  useEffect } from 'react';
import { Tooltip } from 'react-native-paper';


import colors from '../../../styles/color';



export default function UnderReview({data}) {

  const navigation = useNavigation();
  const [underReview, setUnderReview] = useState(null);
  const fallbackImage = 'https://i.ibb.co/GVHVq3c/Arte-da-Parete-Esclusiva-Stampe-su-Tela-Arredo-Moderno-per-la-Casa.jpg';


 
  const GoReviewRequest = (request) => {
    navigation.navigate("ReviewRequest", { request });
  };
 

  useEffect(() => {
    setUnderReview(data);  
    
  }, [data]);
  
  
  
  return (  
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>   
      {data?.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
        <View style={{height:'auto', marginBottom:10}}>
         <Pressable onPress={() => GoReviewRequest(book)}>     
          <View style={{ flexDirection: 'row', direction: 'rtl' }}>
            <View>
              <Image
               style={styles.bookimage}
                source={{ uri: book.imageURL || fallbackImage  }} 
              />
            </View>
            <View style={{ flex: 1, marginLeft: 3, marginTop: 10, alignItems: 'center', }}>
                  <Text style={styles.nametext}>{book.title}</Text>
                  <Text style={styles.authortext}>{book.author}</Text>
                  <Text numberOfLines={3} style={styles.destext}>{book.description}</Text>
                  <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.created_at}>{new Date(book.created_at).toLocaleDateString()}</Text>
                      {book.underreview ? (
                        <View style={[styles.state, { backgroundColor: '#F6E731' }]}>
                          <Text style={styles.underReview}>تحت المراجعة</Text>
                        </View>
                      ) : book.accepted ? (
                        <View style={[styles.state, { backgroundColor: '#8fce00' }]}>
                          <Text style={styles.accepted}>مقبول</Text>
                        </View>
                      ) : (
                        <View style={[styles.state, { backgroundColor: '#f44336' }]}>
                          <Text style={styles.rejected}>مرفوض</Text>
                        </View>
                      )}
                </View>
              </View>
             
              {book.explan && 
                    <Tooltip title={book.explan} titleMaxFontSizeMultiplier={1}>
                      <View>
                         <Text style={styles.explan} 
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      
                      >{book.explan}</Text>
                      </View>
              </Tooltip>  
                      }
            </View>
          </View>
       </Pressable>
        </View>
          <View style={styles.DrawerDivider} />
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:colors.Dark_primary,

  },    

  contentContainer: {
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  scrollView: {
    backgroundColor: '#2c2c2c', // Replace with your colors.Dark_secondary
    borderRadius: 10,
    padding: 1,
  },
  bookContainer: {
    margin: 10,
    
    // Replace with your preferred background color
    borderRadius: 10,
    width:'100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.Main_Text,
  },
  author: {
    fontSize: 16,
    color:colors.sub_text,
  },
  description: {
    fontSize: 14,
    color:colors.sub_text,

  },
  created_at: {
    fontSize: 12,
    color: '#888',
    alignSelf:'flex-start',
    marginHorizontal:10 , 
    
    
  },
  state:{

    alignSelf:'center',
    borderRadius:30,marginHorizontal:5,
    
    
    
  },


  underReview: {
    fontSize: 12,
    color: 'black',
    marginHorizontal:10 , 
    fontWeight: 'bold',

  },

  accepted: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal:10 , 
  },
  rejected: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal:10 , 
    alignSelf:'flex-end',
    marginRight:10,
  },
  explan: {
    fontSize: 12,
    color: '#aaa',
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    marginTop:20,
    
    
  },
  rejectedContainer: {
    alignItems: 'flex-end',
    maxWidth: '70%', // Adjust to ensure text stays within bounds
  },
  DrawerDivider:{
    height: 1, width: '90%', backgroundColor:colors.Dark_secondary,   marginTop:1, alignSelf:'center'

   },
   bookimage: {
    height: 130, width: 90, marginTop: 10, marginLeft: 5 , resizeMode:'contain',
},
nametext:{
    marginTop: 1, fontSize: 20 , color:'white' , alignSelf:"flex-start",marginLeft:10
},
destext:{
    marginTop: 1, fontSize: 20 , color:'#bfbfbf' , textAlign: 'center', alignItems:'center', fontSize:13, marginBottom:5,
},
authortext:{
    marginTop: 3, fontSize: 15 , color:'#bfbfbf' , alignSelf:"flex-start",marginLeft:10
},
   
    
   
});