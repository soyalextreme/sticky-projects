import * as React from "react";
import { Text, TextStyle } from "react-native";
import { StoreContext } from "../state/Store";

export interface TextTitleProps {
  text: string;
  style?: TextStyle;
}

const TextTitle: React.FunctionComponent<TextTitleProps> = ({
  text,
  style,
}) => {
  const {
    store: {
      appState: { theme },
    },
    dispatch,
  } = React.useContext(StoreContext);

  return (
    <Text
      style={{
        color: theme.colors.secondary,
        fontWeight: "bold",
        textAlign: "center",
        ...style,
      }}
    >
      {text}
    </Text>
  );
};

export default TextTitle;
