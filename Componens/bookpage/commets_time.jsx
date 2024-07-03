import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';

const TimeAgo = ({ timestamp }) => {
  const calculateTimeAgo = () => {
    const currentTime = moment();
    const previousTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(previousTime));

    if (duration.asSeconds() < 60) {
      return `قبل ${Math.floor(duration.asSeconds())} ثانية`;
    } else if (duration.asMinutes() < 60) {
      return `قبل ${Math.floor(duration.asMinutes())} دقيقة`;
    } else if (duration.asHours() < 24) {
      return `منذ ${Math.floor(duration.asHours())} ${duration.asHours() === 1 ? 'ساعات' : 'ساعة'} `;
    } else if (duration.asDays() < 30) {
      return `منذ ${Math.floor(duration.asDays())} ${duration.asDays() === 1 ? 'يوم' : 'ايام'} `;
    } else if (duration.asMonths() < 12) {
      return `منذ ${Math.floor(duration.asMonths())} ${duration.asMonths() === 1 ? 'شهر' : 'اشهر'} `;
    } else {
      return `منذ ${Math.floor(duration.asYears())} ${duration.asYears() === 1 ? 'سنة' : 'سنوات'} `;
    }
  };

  return <Text style={{alignContent:'center', fontSize:10 ,color:'rgba(225, 225, 225, 0.5)' , marginRight:15}}>{calculateTimeAgo()}</Text>;
};

export default TimeAgo;
