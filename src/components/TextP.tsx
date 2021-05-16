import * as React from "react";
import { Text, TextStyle } from "react-native";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";

export interface TextPProps {
  text: string;
  style?: TextStyle;
}

const TextP: React.FunctionComponent<TextPProps> = ({ text, style }) => {
  const { store } = React.useContext(StoreContext);

  const globalStyles = genDependentGlobalStyleSheet(
    store.appState.theme.colors
  );

  return (
    <Text style={{ ...globalStyles.Text, fontSize: 20, ...style }}>{text}</Text>
  );
};

export default TextP;
