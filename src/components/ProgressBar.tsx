import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper';

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  address?: string;
}

interface ProfileProgressProps {
  user: User;
}

const ProfileProgress: React.FC<ProfileProgressProps> = React.memo(({user}) => {
  const requiredFields: (keyof User)[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'profileImage',
    'address',
  ];

  console.log(user);
  const [progress, setProgress] = useState<number>(0);

  const calculateProgress = useCallback(() => {
    const filledFields = requiredFields.filter(field => user[field]);
    const percentage = (filledFields.length / requiredFields.length) * 100;
    setProgress(percentage);
  }, [user]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress / 100}
        color="#333"
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>
        Complete profile: {progress.toFixed(0)}%
      </Text>
    </View>
  );
});

// Apply React.memo to prevent unnecessary re-renders
export default ProfileProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  progressText: {
    fontSize: 15,
    marginTop: 5,
  },
  progressBar: {
    width: 150,
    height: 6,
    borderRadius: 5,
  },
});
