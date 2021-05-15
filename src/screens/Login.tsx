import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ChangeTheme from "../components/ChangerTheme";
import InputText from "../components/InputText";
import TextTitle from "../components/TextTitle";
import { StoreContext } from "../state/Store";
import Button from "../components/Button";
import LinkRedirect from "../components/LinkRedirect";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const { useContext } = React;

  const { store, dispatch } = useContext(StoreContext);

  const {
    appState: { notification },
  } = store;

  const dependentStyles = StyleSheet.create({
    Login__Main: {
      backgroundColor: store.appState.theme.colors.background,
      flex: 1,
      alignItems: "center",
    },
  });

  return (
    <View style={dependentStyles.Login__Main}>
      <ChangeTheme />
      <View>
        <Image
          source={require("../images/note_paper.png")}
          style={{ width: 250, height: 250, marginTop: 50 }}
        />
      </View>
      <View
        style={{
          width: "70%",
          padding: 20,
        }}
      >
        <TextTitle text="Your email" style={{ fontSize: 25 }} />
        <InputText
          placeholder="tonystark@avengers.com"
          keybordType="email-address"
          onChange={() => {}}
        />
        <TextTitle text="Your password" style={{ fontSize: 25 }} />
        <InputText
          placeholder="Secret Password"
          keybordType="default"
          onChange={() => {}}
        />
        <View style={{ ...ss.Login__buttonContainer }}>
          <Button title="Login Now!" onPress={() => {}} />
        </View>
      </View>
      <LinkRedirect text="I don't have an account." />
    </View>
  );
};

const ss = StyleSheet.create({
  Login__buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default Login;
