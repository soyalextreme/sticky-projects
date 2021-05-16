import * as React from "react";
import { Text } from "react-native";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";

export interface TextPProps {
  text: string;
}

const TextP: React.FunctionComponent<TextPProps> = ({ text }) => {
  const { store } = React.useContext(StoreContext);

  const globalStyles = genDependentGlobalStyleSheet(
    store.appState.theme.colors
  );

  return <Text style={{ ...globalStyles.Text }}>{text}</Text>;
};

export default TextP;
