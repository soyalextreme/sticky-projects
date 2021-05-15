import * as React from "react";
import { KeyboardType, StyleSheet, TextInput } from "react-native";
import { StoreContext } from "../state/Store";

export interface InputTextProps {
  particularStyles?: any;
  onChange: (text: string) => void;
  placeholder: string;
  keybordType: KeyboardType;
  secureTextEntry?: boolean;
}

const InputText: React.FunctionComponent<InputTextProps> = ({
  particularStyles,
  onChange,
  placeholder,
  keybordType,
  secureTextEntry,
}) => {
  const {
    store: {
      appState: { theme },
    },
    dispatch,
  } = React.useContext(StoreContext);

  const dependentStyle = StyleSheet.create({
    input: {
      backgroundColor: "white",
      borderColor: theme.colors.primary,
      borderWidth: 5,
      paddingHorizontal: 30,
      paddingVertical: 8,
      borderRadius: 20,
      marginVertical: 12,
      fontSize: 15,
    },
  });

  return (
    <>
      <TextInput
        style={{ ...dependentStyle.input, ...particularStyles }}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keybordType}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

export default InputText;
