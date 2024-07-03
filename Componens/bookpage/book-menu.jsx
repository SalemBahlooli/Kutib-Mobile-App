import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, Vibration, View } from 'react-native';
import moment from 'moment';
import { BookPlus , BookmarkCheck , BookHeart , BookCheck , Bookmark  } from 'lucide-react-native';
import colors from '../../styles/color';
import { 
  checkAndInsertdone,
  checkAndInsertfavorite, 
  checkAndInsertlater, 
  checkLater,
  checkdone,
  checkfavorite,
  deletedone,
  deletefavorite, 
  deletelater } from '../../Actions/books';

const BookMenu = ({ bookId , clerkId , supabase  , image}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [later, setLater] = useState(false);
    const [favorite, setfavorite] = useState(false);
    const [done, setdone] = useState(false);

    useEffect(() => {
        const fetchData = async () => { 
          const result = await checkLater(supabase, clerkId, bookId);
          setLater(result.exists);
          const favorite = await checkfavorite(supabase, clerkId, bookId);
          setfavorite(favorite.exists);
          const done = await checkdone(supabase, clerkId, bookId);
          setdone(done.exists);
        };
    
        fetchData();
      }, [bookId]);


      const handleAddLater = async (supabase, clerk_id, bookid, image) => {
        // Vibrate the device
        Vibration.vibrate();
       const doneA = await checkAndInsertlater (supabase, clerk_id, bookid, image);
       if (doneA){
        setLater(true);
        if (done){
          handleDeletedone(supabase, clerk_id, bookid)

        }
       }
    
      };

      const handleDeleteLater =  (supabase, clerk_id, bookid) => {
        // Vibrate the device
        Vibration.vibrate();
        const doneD =  deletelater(supabase, clerk_id, bookid);
        if (doneD){
            setLater(false);
           }
      };

      const handleAddfavorite = async (supabase, clerk_id, bookid, image) => {
        // Vibrate the device
        Vibration.vibrate();
       const doneA = await checkAndInsertfavorite (supabase, clerk_id, bookid, image);
       if (doneA){
        setfavorite(true);
       }
    
      };

      const handleDeletefavorite =  (supabase, clerk_id, bookid) => {
        // Vibrate the device
        Vibration.vibrate();
        const doneD =  deletefavorite(supabase, clerk_id, bookid);
        if (doneD){
            setfavorite(false);
           }
      };
      const handleAdddone = async (supabase, clerk_id, bookid, image) => {
        // Vibrate the device
        Vibration.vibrate();
       const doneA = await checkAndInsertdone (supabase, clerk_id, bookid, image);
       if (doneA){
        setdone(true);
        if (later){
          handleDeleteLater(supabase, clerk_id, bookid)
        }
       }
    
      };

      const handleDeletedone =  (supabase, clerk_id, bookid) => {
        // Vibrate the device
        Vibration.vibrate();
        const doneD =  deletedone(supabase, clerk_id, bookid);
        if (doneD){
            setdone(false);
           }
      };

    return(

        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>


        <View style={{ flexDirection: 'row', marginVertical: 10, width: '100%',  paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BookHeart  size={30} color={colors.special} style={{ marginHorizontal: 10 }} />
            <Text style={{ fontSize: 22, color: colors.sub_text }}>
               المفضلة
            </Text>
          </View>

         {favorite?
          <Pressable onPress={() =>handleDeletefavorite(supabase, clerkId, bookId)}>
                 <BookmarkCheck size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          :
          <Pressable onPress={() =>handleAddfavorite(supabase, clerkId, bookId, image)}>
                 <Bookmark size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          
          }
        </View>

        <View style={styles.DrawerDivider} />

        <View style={{ flexDirection: 'row', marginVertical: 10, width: '100%',  paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable disabled={isLoading}>
                 <BookPlus size={30} color={colors.special} style={{ marginHorizontal: 10 }} />
            </Pressable>
            <Text style={{ fontSize: 22, color: colors.sub_text }}>
              اقراه لاحقاً
            </Text>
          </View>
          {later?
          <Pressable onPress={() =>handleDeleteLater(supabase, clerkId, bookId)}>
                 <BookmarkCheck size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          :
          <Pressable onPress={() =>handleAddLater(supabase, clerkId, bookId, image)}>
                 <Bookmark size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          
          }
          
        </View>

        <View style={styles.DrawerDivider} />

        <View style={{ flexDirection: 'row', marginVertical: 10, width: '100%',  paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BookCheck  size={30} color={colors.special} style={{ marginHorizontal: 10 }} />
            <Text style={{ fontSize: 22, color: colors.sub_text }}>
              تمت  القراءة
            </Text>
          </View>

          {done?
          <Pressable onPress={() =>handleDeletedone(supabase, clerkId, bookId)}>
                 <BookmarkCheck size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          :
          <Pressable onPress={() =>handleAdddone(supabase, clerkId, bookId, image)}>
                 <Bookmark size={30} color={colors.special} style={{ alignSelf: 'center' }} /> 
          </Pressable>
          
          }
        </View>


      </View>




    );
 

};


const styles = StyleSheet.create({
    DrawerDivider:{
        height: 1, width: '90%', backgroundColor:colors.Dark_primary,   marginTop:5, alignSelf:'center'
    
       },
  });
  

export default BookMenu;
