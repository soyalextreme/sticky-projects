import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import ChangeTheme from "../components/ChangerTheme";
import InputText from "../components/InputText";
import TextTitle from "../components/TextTitle";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import { StoreContext } from "../state/Store";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const { useContext } = React;

  const { store, dispatch } = useContext(StoreContext);

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
      </View>
    </View>
  );
};

export default Login;
