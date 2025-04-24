import React, {useState} from 'react';
import {View, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Images, Colors} from '../../theme';
import {Image} from 'react-native';
import {Text} from '../../components';
import {strings} from '../../i18n';

const TimePickerField = ({
  dayName,
  timeKey,
  value,
  onChange,
}: {
  dayName: string;
  timeKey: string;
  value: string;
  onChange: (dayName: string, timeKey: string, time: string) => void;
}) => {
  const [show, setShow] = useState(false);

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (event.type === 'set' && selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      onChange(dayName, timeKey, `${hours}:${minutes}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.selectTimeView}>
        {value ? (
          <Text style={styles.time}>{value}</Text>
        ) : (
          <Text style={styles.placeHolder}>
            {strings('shopTimings.selectTime')}
          </Text>
        )}
        <Image source={Images.filterCalendar} style={styles.calendarIcon} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={
            value
              ? new Date(`1970-01-01T${value}:00`)
              : new Date('1970-01-01T00:00:00')
          }
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
          is24Hour={true}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectTimeView: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  time: {fontSize: 12, color: 'white'},
  placeHolder: {fontSize: 11, color: 'white', width: 40, textAlign: 'center'},
  calendarIcon: {width: 15, height: 15},
  container: {flex: 1, marginHorizontal: 4},
});
export default TimePickerField;
