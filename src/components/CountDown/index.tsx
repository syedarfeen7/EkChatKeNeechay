import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

type CountdownTimerProps = {
  totalSeconds: number;
  onFinish?: () => void;
  showMinutes?: boolean;
  showHours?: boolean;
  style?: object;
  textStyle?: object;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  totalSeconds,
  onFinish,
  showMinutes = true,
  showHours = false,
  style,
  textStyle,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
  }, [onFinish]);

  const formatTime = () => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (showHours) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else if (showMinutes) {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(seconds)}`;
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{formatTime()}</Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
