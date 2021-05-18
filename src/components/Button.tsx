import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";
import { StoreContext } from "../state/Store";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: TextStyle;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  const { useContext } = React;

  const { dispatch, store } = useContext(StoreContext);

  // dependent styles

  const dependentStyles = StyleSheet.create({
    Button__main: {
      backgroundColor: store.appState.theme.colors.primary,
      width: "100%",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderColor: store.appState.theme.colors.alternative,
      borderRadius: 20,
      borderWidth: 3,
      marginVertical: 20,
    },
    Button__text: {
      color: store.appState.theme.colors.alternative,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  return (
    <>
      <TouchableOpacity onPress={onPress} style={dependentStyles.Button__main}>
        <Text style={{ ...dependentStyles.Button__text, ...style }}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
