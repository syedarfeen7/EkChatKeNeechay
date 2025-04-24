import React, {FC} from 'react';
import {Text, View, Image} from 'react-native';

import styles from './style';
import {ButtonView} from '../../components';
import {Metrics, Images} from '../../theme';
import {strings} from '../../i18n';

type TimeRange = {
  isActive: boolean;
  openingTime?: string;
  closingTime?: string;
  openingTime2?: string;
  closingTime2?: string;
};

export type Weekdays = {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
};

interface Props {
  weekdays: Weekdays;
  heading?: string;
  onArrowPress?: () => void;
}

const daysMap = [
  {key: 'mon', name: 'monday'},
  {key: 'tue', name: 'tuesday'},
  {key: 'wed', name: 'wednesday'},
  {key: 'thu', name: 'thursday'},
  {key: 'fri', name: 'friday'},
  {key: 'sat', name: 'saturday'},
  {key: 'sun', name: 'sunday'},
];

const WeekDaysTimings: FC<Props> = ({weekdays, heading, onArrowPress}) => {
  const renderTimeString = (time?: string) => time ?? '';

  const renderTime = (dayKey: string, dayObject?: TimeRange) => {
    if (!dayObject || dayObject.isActive) {
      return null;
    }

    const {openingTime, closingTime, openingTime2, closingTime2} = dayObject;

    return (
      <View key={dayKey} style={{flexDirection: 'row'}}>
        <Text style={[styles.timingText2, {width: Metrics.ratio(50)}]}>
          {strings(`daysShort.${dayKey}`)}
        </Text>
        <Text style={styles.timingText2}>
          {renderTimeString(openingTime)}
          {closingTime ? ' - ' : ''}
          {renderTimeString(closingTime)}
          {openingTime2 ? ' | ' : ''}
          {renderTimeString(openingTime2)}
          {closingTime2 ? ' - ' : ''}
          {renderTimeString(closingTime2)}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          {heading && <Text style={styles.timingText}>{heading}</Text>}
          <View style={{marginTop: Metrics.ratio(10)}}>
            {daysMap.map(({key, name}) =>
              renderTime(key, weekdays[name as keyof Weekdays]),
            )}
          </View>
        </View>
        <ButtonView
          onPress={onArrowPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Metrics.ratio(35),
          }}>
          <Image
            style={{width: Metrics.ratio(16), height: Metrics.ratio(16)}}
            resizeMode="contain"
            source={Images.arrowdown}
          />
        </ButtonView>
      </View>
    </View>
  );
};

export default WeekDaysTimings;
