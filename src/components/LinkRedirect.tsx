import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { StoreContext } from "../state/Store";

export interface LinkRedirectProps {
  text: string;
  nameToRedirect?: string;
}

const LinkRedirect: React.FunctionComponent<LinkRedirectProps> = ({
  text,
  nameToRedirect,
}) => {
  const { useContext } = React;

  const {
    store: {
      appState: { theme },
    },
  } = useContext(StoreContext);

  return (
    <TouchableOpacity>
      <Text
        style={{
          color: theme.colors.alternative,
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.alternative,
          fontWeight: "normal",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkRedirect;
