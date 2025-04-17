import React from 'react';
import {Portal, Dialog, TextInput, Button} from 'react-native-paper';

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
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label={placeholder}
            secureTextEntry={secureTextEntry}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSubmit}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PasswordInputDialog;
