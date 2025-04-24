import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './style';
import {ButtonView, CarhubButton, NavBar, Text} from '../../components';
import {Metrics, Colors, Images} from '../../theme';
import {useTranslation} from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import Utils from '../../utils';
// import {AnalyticsHelper} from '../../helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {strings} from '../../i18n';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import TimePickerField from './TimePickerField';

type RouteParams = {
  weekdays?: Weekdays;
  onSet: (weekdays: Weekdays) => void;
};

type Time = string;

type DayTiming = {
  openingTime: Time;
  closingTime: Time;
  openingTime2: Time;
  closingTime2: Time;
  isActive: boolean;
};

type Weekdays = {
  [key: string]: DayTiming;
};

type ShopTimingsProps = {};

const defaultWeekdayValues: DayTiming = {
  openingTime: '00:00',
  closingTime: '23:30',
  openingTime2: '',
  closingTime2: '',
  isActive: false,
};

const initialWeekdays: Weekdays = {
  monday: {...defaultWeekdayValues},
  tuesday: {...defaultWeekdayValues},
  wednesday: {...defaultWeekdayValues},
  thursday: {...defaultWeekdayValues},
  friday: {...defaultWeekdayValues},
  saturday: {...defaultWeekdayValues},
  sunday: {...defaultWeekdayValues},
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

const ShopTimings: React.FC<ShopTimingsProps> = () => {
  const {i18n} = useTranslation();
  const [weekdaysState, setWeekdaysState] = useState<Weekdays>(initialWeekdays);
  const route = useRoute();
  const {weekdays = {}, onSet} = route.params as RouteParams;
  const navigation = useNavigation<NavigationProp>();
  const [showPicker, setShowPicker] = useState<{
    day: string;
    key: keyof DayTiming;
  } | null>(null);

  useEffect(() => {
    if (!_.isEmpty(weekdays)) {
      setWeekdaysState(weekdays);
    }

    // AnalyticsHelper.setCurrentScreen('ShopTimings');
    moment.locale(i18n.language === 'en' ? 'en' : 'ar');
  }, [weekdays, i18n.language]);

  const handleDateChange = (
    dayName: string,
    timeKey: keyof DayTiming,
    value: Time,
  ) => {
    setWeekdaysState(prev => ({
      ...prev,
      [dayName]: {
        ...prev[dayName],
        [timeKey]: Utils.toEnglishDigits(value),
      },
    }));
  };

  const toggleDayActive = (dayName: string) => {
    setWeekdaysState(prev => ({
      ...prev,
      [dayName]: {
        ...prev[dayName],
        isActive: !prev[dayName].isActive,
      },
    }));
  };

  const renderTimePicker = (
    dayName: string,
    timeKey: keyof DayTiming,
    time: Time,
  ) => {
    return (
      <TimePickerField
        dayName={dayName}
        timeKey={timeKey}
        value={time}
        onChange={handleDateChange}
      />
    );
  };

  const renderDayHeader = () => (
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>{strings('shopTimings.openTime1')}</Text>
      <Text style={styles.headingText}>
        {strings('shopTimings.closeTime1')}
      </Text>
      <Text style={styles.headingText}>{strings('shopTimings.openTime2')}</Text>
      <Text style={styles.headingText}>
        {strings('shopTimings.closeTime2')}
      </Text>
    </View>
  );

  const renderDayControl = (dayName: string) => {
    const isActive = weekdaysState[dayName].isActive;

    return (
      <ButtonView
        onPress={() => toggleDayActive(dayName)}
        style={styles.dayNameView}>
        <Text style={styles.dayName}>
          {strings(`profile.label.${dayName}`)}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              {color: isActive ? Colors.secondary : Colors.text.dis},
              styles.closedText,
            ]}>
            {strings('registerProvider.closed')}
          </Text>
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            checkedColor={Colors.secondary}
            uncheckedColor={Colors.text.dis}
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checked={isActive}
            onPress={() => toggleDayActive(dayName)}
          />
        </View>
      </ButtonView>
    );
  };

  const renderTimePickerRow = (dayName: string, index: number) => {
    const {openingTime, closingTime, openingTime2, closingTime2} =
      weekdaysState[dayName];

    return (
      <View key={index} style={{marginTop: Metrics.ratio(20)}}>
        {renderDayControl(dayName)}
        <View style={styles.timePickerContainer}>
          {renderTimePicker(dayName, 'openingTime', openingTime)}
          {renderTimePicker(dayName, 'closingTime', closingTime)}
          {renderTimePicker(dayName, 'openingTime2', openingTime2)}
          {renderTimePicker(dayName, 'closingTime2', closingTime2)}
        </View>
      </View>
    );
  };

  const isButtonDisabled = (): boolean => {
    return Object.values(weekdaysState).every(day => day.isActive);
  };

  console.log(Object.keys(weekdaysState));
  return (
    <ScrollView style={styles.container}>
      <NavBar
        title={strings('navtitles.shopTimings')}
        titleStyle={{color: Colors.darkStaleBlue}}
        onLeftTapped={() => navigation.goBack()}
        leftImage={Images.back}
      />
      {renderDayHeader()}
      {Object.keys(weekdaysState).map((dayName, index) =>
        renderTimePickerRow(dayName, index),
      )}
      <View style={styles.buttonContainer}>
        <CarhubButton
          isDisable={isButtonDisabled()}
          onPress={() => onSet(weekdaysState)}
          text={strings('filterService.submit')}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          mode="time"
          style={styles.dateContainer}
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate && showPicker) {
              const hours = selectedDate.getHours().toString().padStart(2, '0');
              const minutes = selectedDate
                .getMinutes()
                .toString()
                .padStart(2, '0');
              handleDateChange(
                showPicker.day,
                showPicker.key,
                `${hours}:${minutes}`,
              );
            }
            setShowPicker(null);
          }}
        />
      )}
    </ScrollView>
  );
};

export default ShopTimings;
