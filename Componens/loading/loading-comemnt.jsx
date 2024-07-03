import React, { useState, useEffect , createContext, useRef} from 'react';
import { View, ScrollView, Text, Image, StyleSheet,  Pressable } from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../styles/color';


import { Skeleton } from 'moti/skeleton';




const LoadingComment = ({ loading }) => {
  // State management



return (
    <View  style={styles.CommentOuterContainer}>
    <View style={styles.commentContainer}>
   <View>
        <Skeleton colorMode={'dark'} width={40} height={40} radius={40} transition={40} backgroundSize={15} />
   </View>
      <View style={styles.commentContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{marginLeft:10}}>
                                      <Skeleton colorMode={'dark'} width={100} height={20}  />

                </View>
          

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                 <Skeleton colorMode={'dark'} width={50} height={10}  />

          </View>
        </View>
        <View style={styles.commentText}>
             <Skeleton colorMode={'dark'} width={300} height={60}  />     

        </View>

     
        <View style={styles.actionsContainer}>
        
        </View>
      </View>
    </View>


    <View style={styles.DrawerDivider} />


    <View style={styles.commentContainer}>
   <View>
        <Skeleton colorMode={'dark'} width={40} height={40} radius={40} transition={40} backgroundSize={15} />
   </View>
      <View style={styles.commentContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{marginLeft:10}}>
                                      <Skeleton colorMode={'dark'} width={100} height={20}  />

                </View>
          

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                 <Skeleton colorMode={'dark'} width={50} height={10}  />

          </View>
        </View>
        <View style={styles.commentText}>
             <Skeleton colorMode={'dark'} width={300} height={60}  />     

        </View>

     
        <View style={styles.actionsContainer}>
        
        </View>
      </View>
    </View>


    <View style={styles.commentContainer}>
   <View>
        <Skeleton colorMode={'dark'} width={40} height={40} radius={40} transition={40} backgroundSize={15} />
   </View>
      <View style={styles.commentContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{marginLeft:10}}>
                                      <Skeleton colorMode={'dark'} width={100} height={20}  />

                </View>
          

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                 <Skeleton colorMode={'dark'} width={50} height={10}  />

          </View>
        </View>
        <View style={styles.commentText}>
             <Skeleton colorMode={'dark'} width={300} height={60}  />     

        </View>

     
        <View style={styles.actionsContainer}>
        
        </View>
      </View>
    </View>
  </View>
);

}


const styles = StyleSheet.create({
  scrollView: {
    flexDirection:'column',
  },
  userContainer: {
    marginLeft: 3,
  },
  CommentOuterContainer: {
    // backgroundColor: '#212121',
     borderRadius: 10,
      paddingLeft: 5,
       marginTop: 5 ,
      //  borderWidth: 2,
    // borderColor:"rgba(225, 225, 225, 0.05)",
  },

  DrawerDivider:{
    height: 1, width: '90%', backgroundColor:colors.Dark_primary,   marginTop:5, alignSelf:'center'

   },
   



  userImage: {
    width: 110,
    height: 150,
    borderRadius: 0,
  },
  book:{
   
   backgroundColor:"#191919",
   height:150,

  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius:20, 
    marginTop:10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    color:"white",
  },
  commentText: {
    fontSize: 16,
    color:'white',
    textAlign:'right',
    paddingRight:15,
    marginTop:10,
    marginLeft:30
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default LoadingComment;
