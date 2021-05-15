import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ChangeTheme from "../components/ChangerTheme";
import InputText from "../components/InputText";
import TextTitle from "../components/TextTitle";
import { StoreContext } from "../state/Store";
import Button from "../components/Button";
import LinkRedirect from "../components/LinkRedirect";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";
import validateLoginFields from "../utils/validateLoginFields";
import { AlertType } from "../../types";
import connection from "../db/connection";

export interface LoginProps {
  navigation: any;
}

const Login: React.FunctionComponent<LoginProps> = ({ navigation }) => {
  const { useContext, useState } = React;

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const { store, dispatch } = useContext(StoreContext);

  const {
    appState: { notification, theme },
  } = store;

  const dependentStyles = genDependentGlobalStyleSheet(theme.colors);

  const handlePress = () => {
    const err = validateLoginFields(loginInfo.email, loginInfo.password);
    let errorMsg = "";

    if (err.emailActive) {
      errorMsg += "Verify Email";
    }
    if (err.passwordActive) {
      errorMsg += "  Verify Password";
    }

    if (!err.passwordActive && !err.emailActive) {
      // verified push the login
      console.log("login", err);

      /// PENDING LOGIN

      connection.firebase
        .auth()
        .signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
        .then(() => console.log("iniciando sesion"))
        .catch((error) => {
          const payload: AlertType = {
            active: true,
            error: true,
            msg: "Verify the credentials, we attepmted but no authorization with this credentials",
            title: "Ups! Error Login",
          };
          dispatch({ type: "OPEN_ALERT", payload });
          console.error(error);
        });
    } else {
      // show errors
      const payload: AlertType = {
        active: true,
        error: true,
        msg: errorMsg,
        title: "Ups! Error Login",
      };
      dispatch({ type: "OPEN_ALERT", payload });
    }
  };

  return (
    <View style={dependentStyles.Screen__Main}>
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
          onChange={(text: string) => {
            setLoginInfo({ ...loginInfo, email: text });
          }}
        />
        <TextTitle text="Your password" style={{ fontSize: 25 }} />
        <InputText
          placeholder="Secret Password"
          keybordType="default"
          onChange={(text: string) => {
            setLoginInfo({ ...loginInfo, password: text });
          }}
          secureTextEntry={true}
        />
        <View style={{ ...ss.Login__buttonContainer }}>
          <Button title="Login Now!" onPress={handlePress} />
        </View>
      </View>
      <LinkRedirect
        text="I don't have an account."
        fnRedirect={() => navigation.navigate("Register")}
      />
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
