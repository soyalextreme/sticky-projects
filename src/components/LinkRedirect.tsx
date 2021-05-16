import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { StoreContext } from "../state/Store";

export interface LinkRedirectProps {
  text: string;
  fnRedirect?: () => void;
}

const LinkRedirect: React.FunctionComponent<LinkRedirectProps> = ({
  text,
  fnRedirect,
}) => {
  const { useContext } = React;

  const {
    store: {
      appState: { theme },
    },
  } = useContext(StoreContext);

  return (
    <TouchableOpacity onPress={fnRedirect}>
      <Text
        style={{
          color: theme.colors.alternative,
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.alternative,
          fontWeight: "normal",
          fontSize: 18,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkRedirect;
