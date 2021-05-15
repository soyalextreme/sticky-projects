import * as React from "react";
import { Text, View } from "react-native";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";

export interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
  const { useContext } = React;

  const {
    store: {
      appState: { theme },
    },
  } = useContext(StoreContext);

  const dependentStyles = genDependentGlobalStyleSheet(theme.colors);

  return (
    <View style={{ ...dependentStyles.Screen__Main }}>
      <Text>Registrate</Text>
    </View>
  );
};

export default Register;
