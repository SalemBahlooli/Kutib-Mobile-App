import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Assuming you're using react-native-paper for Checkbox
import colors from '../../styles/color';

const CheckBoxList = ({ checkedItems, toggleCheckbox }) => {
  const checkboxes = [
    { label: 'ادب', value: 'ادب' },
    { label: 'الأسرة و الطفل', value: 'الأسرة و الطفل' },
    { label: 'النفس وتطوير الذات', value: 'النفس وتطوير الذات' },
    { label: 'أطفال', value: 'أطفال' },
    { label: 'علمي', value: 'علمي' },
    { label: 'فلسفة', value: 'فلسفة' },
    { label: 'فنون', value: 'فنون' },
    { label: 'قانون', value: 'قانون' },
    { label: 'مال واعمال', value: 'مال واعمال' },
    { label: 'مذكرات', value: 'مذكرات' },
    { label: 'مراجع وابحاث', value: 'مراجع وابحاث' },
    { label: 'رياضة وتسلية', value: 'رياضة وتسلية' },
    { label: 'طب وصحة', value: 'طب وصحة' },
    { label: 'صحافة واعلام', value: 'صحافة واعلام' },
    { label: 'سفر وترحال', value: 'سفر وترحال' },
    { label: 'سياسة', value: 'سياسة' },
    { label: 'تاريخ', value: 'تاريخ' },
    { label: 'تكنلوجيا', value: 'تكنلوجيا' },
    { label: 'لغات', value: 'لغات' },
    { label: 'ميثولوجيا واساطير', value: 'ميثولوجيا واساطير' },
    { label: 'روايات وقصص', value: 'روايات وقصص' },
  
    // Add more checkboxes as needed
  ];

  return (
    <View style={styles.checkboxContainer}>
      {checkboxes.map((checkbox, index) => (
        <Checkbox.Item
          key={index}
          label={checkbox.label}
          labelStyle={{color:'white'}}
          status={checkedItems.includes(checkbox.value) ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckbox(checkbox.value)}
          color={colors.special}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBoxList;
