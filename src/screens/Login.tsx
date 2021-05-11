import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StoreContext } from "../state/Store";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const { useContext } = React;

  const { store, dispatch } = useContext(StoreContext);

  const dependentStyles = StyleSheet.create({
    Login__Main: {
      backgroundColor: store.appState.theme.colors.background,
      flex: 1,
    },
  });

  const handleChangeTheme = (dark: boolean): void => {
    dispatch({ type: "SET_THEME", payload: { dark } });
  };

  return (
    <View style={dependentStyles.Login__Main}>
      <Text>No auth, Login</Text>
      <Button
        title="Change Theme"
        onPress={() => handleChangeTheme(!store.appState.theme.dark)}
        color={store.appState.theme.colors.primary}
      />
    </View>
  );
};

export default Login;
