import React from 'react';
import {Modal, View, StyleSheet, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';

type PasswordDialogProps = {
  visible: boolean;
  title: string;
  placeholder?: string;
  onSubmit: (text: string) => void;
  onDismiss: () => void;
  secureTextEntry?: boolean;
};

const PasswordInputDialog: React.FC<PasswordDialogProps> = ({
  visible,
  title,
  placeholder = 'Enter',
  onSubmit,
  onDismiss,
  secureTextEntry = true,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    onDismiss();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
            inputContainerStyle={{borderBottomWidth: 0}}
            containerStyle={{paddingHorizontal: 0}}
          />
          <View style={styles.actions}>
            <Button title="Cancel" type="clear" onPress={onDismiss} />
            <Button title="OK" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default PasswordInputDialog;
