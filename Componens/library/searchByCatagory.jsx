import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,ScrollView , Pressable ,FlatList , Modal } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Avatar , Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {  ActivityIndicator } from 'react-native';
import { supabase } from '../../hook/supabaseClient';
import StarRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Chip } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import colors from '../../styles/color';


const SearchByCatagory = ({search}) => {
    const [fetchError, setFetchError] = useState(null);
    const [bookList, setBookList] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [checkedItems, setCheckedItems] = useState([]);


    // Function to toggle the checkbox
  const toggleCheckbox = (value) => {
    if (checkedItems.includes(value)) {
      // If value is already in the array, remove it
      setCheckedItems(checkedItems.filter(item => item !== value));
    } else {
      // If value is not in the array, add it
      setCheckedItems([...checkedItems, value]);
    }
  }


  const handleCloseModal = () => {
    setModalVisible(false);
  };


  const handlePress = (book_id) => {
    // Navigate to the "Book" screen with the book ID
    navigation.navigate('Book', { book_id });
  };
  
    useEffect(() => {
      const fetchbooklist = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('Books')
            .select('*')
            .contains('catagory', checkedItems);
  
          if (error) {
            setFetchError('Could not fetch users');
            setBookList(null);
            setLoading(false);
          } else {
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            setBookList(sortedData);
            setLoading(false);
            setFetchError(null);
            //console.log(data);
            setLoading(false);
          }
        } catch (error) {
          
          setFetchError('An error occurred while fetching users');
          setLoading(false);
        }
      };
  
      fetchbooklist();
    }, [checkedItems]);
  
    const renderItem = ({ item }) => (
      <Pressable onPress={() => handlePress(item.id)}>
        <View style={{ backgroundColor: '#212121', height: 150, borderRadius: 8, marginTop: 3 }}>
          <View style={{ flexDirection: 'row', direction: 'rtl' }}>
            <View>
              <Image
               style={styles.bookimage}
                source={{ uri: item.URLImage }} 
              />
            </View>
            <View style={{flex: 1, marginLeft: 3, marginTop: 10, alignItems: 'center' }}>
              <Text style={styles.nametext}>{item.name}</Text>
              <Text style={styles.authortext}>{item.author}</Text>
                    <View style={{flexDirection:'row' , alignSelf:'flex-start' , marginTop:10,}}>
                        <StarRating disabled={true} maxStars={1} rating={1} starSize={15} fullStarColor={'rgba(255, 123, 0 , 0.5)'} starStyle={{marginRight:3,}} />
                  <Text style={{color:'rgba(255, 123, 0 , 0.5)'}}>{item.rate}</Text>
                    </View>
              
              <Text numberOfLines={3} style={styles.destext}>{item.description}</Text>
            </View>
          </View>
        </View>
       </Pressable>
      );
    
      return (
       <View>
        
        <Spinner visible={loading} />

        <ScrollView horizontal={true} style={{backgroundColor:colors.Dark_secondary, borderRadius:10,}}>

        
        <Checkbox.Item
  label="ادب"
  status={checkedItems.includes('ادب') ? 'checked' : 'unchecked'}
  onPress={() => toggleCheckbox('ادب')}
  color={colors.special}
/>
      <Checkbox.Item
        label="الأسرة و الطفل"
        status={checkedItems.includes('الأسرة و الطفل') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('الأسرة و الطفل')} color={colors.special}
      />
      <Checkbox.Item
        label="النفس وتطوير الذات"
        status={checkedItems.includes('النفس وتطوير الذات') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('النفس وتطوير الذات')}color={colors.special}
      />
      <Checkbox.Item
        label="أطفال"
        status={checkedItems.includes('أطفال') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('أطفال')}color={colors.special}
      />
      <Checkbox.Item
        label="علمي"
        status={checkedItems.includes('علمي') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('علمي')}color={colors.special}
      />
      <Checkbox.Item
        label="فلسفة"
        status={checkedItems.includes('فلسفة') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('فلسفة')}color={colors.special}
      />
      <Checkbox.Item
        label="فنون"
        status={checkedItems.includes('فنون') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('فنون')}color={colors.special}
      />
      <Checkbox.Item
        label="قانون"
        status={checkedItems.includes('قانون') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('قانون')}color={colors.special}
      />
      <Checkbox.Item
        label="مال واعمال"
        status={checkedItems.includes('مال واعمال') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('مال واعمال')}color={colors.special}
      />
      <Checkbox.Item
        label="مذكرات"
        status={checkedItems.includes('مذكرات') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('مذكرات')}color={colors.special}
      />
      <Checkbox.Item
        label="مراجع وابحاث"
        status={checkedItems.includes('مراجع وابحاث') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('مراجع وابحاث')}color={colors.special}
      />
      <Checkbox.Item
        label="رياضة وتسلية"
        status={checkedItems.includes('رياضة وتسلية') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('رياضة وتسلية')}color={colors.special}
      />
      <Checkbox.Item
        label="طب وصحة"
        status={checkedItems.includes('طب وصحة') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('طب وصحة')}color={colors.special}
      />
      <Checkbox.Item
        label=" صحافة واعلام"
        status={checkedItems.includes(' صحافة واعلام') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(' صحافة واعلام')}color={colors.special}
      />
      <Checkbox.Item
        label="سفر وترحال"
        status={checkedItems.includes('سفر وترحال') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('سفر وترحال')}color={colors.special}
      />
      <Checkbox.Item
        label="سياسة"
        status={checkedItems.includes('سياسة') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('سياسة')}color={colors.special}
      />
      <Checkbox.Item
        label="تاريخ"
        status={checkedItems.includes('تاريخ') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('تاريخ')}color={colors.special}
      />
      <Checkbox.Item
        label="تكنلوجيا"
        status={checkedItems.includes('تكنلوجيا') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('تكنلوجيا')}color={colors.special}
      />
      <Checkbox.Item
        label="لغات"
        status={checkedItems.includes('لغات') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('لغات')}color={colors.special}
      />
      <Checkbox.Item
        label="ميثولوجيا واساطير"
        status={checkedItems.includes('ميثولوجيا واساطير') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('ميثولوجيا واساطير')}color={colors.special}
      />
      <Checkbox.Item
        label="روايات وقصص"
        status={checkedItems.includes('روايات وقصص') ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox('روايات وقصص')}color={colors.special}
      />
     
        </ScrollView>

       

<View style={{alignItems:'center' , marginTop:5}}>
{/* <Text>Checked Items: {JSON.stringify(checkedItems)}</Text> */}
          <Text style={{color:'white'}}>البحث بالتصنيف</Text>
        </View>

        <FlatList
          data={bookList}
          keyExtractor={(item) => item.id.toString()} // Replace 'id' with the actual property name for the unique key
          renderItem={renderItem}
          scrollEnabled={false}
        />
        </View>
      );
    };
  
    const styles = StyleSheet.create({
        bookimage: {
            height: 130, width: 90, marginTop: 10, marginLeft: 5 , resizeMode:'cover',
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
        
      });
  export default SearchByCatagory;