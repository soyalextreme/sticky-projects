import * as React from "react";
import { Text, View } from "react-native";
import { AlertType } from "../../types";
import Button from "../components/Button";
import ChangeTheme from "../components/ChangerTheme";
import InputText from "../components/InputText";
import LinkRedirect from "../components/LinkRedirect";
import connection from "../db/connection";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";
import validateRegister from "../utils/validateRegister";

export interface RegisterProps {
  navigation: any;
}

const Register: React.FunctionComponent<RegisterProps> = ({ navigation }) => {
  const { useContext, useState } = React;

  const [data, setData] = useState({
    name: "ANONYMOUS",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    store: {
      appState: { theme },
    },
    dispatch,
  } = useContext(StoreContext);

  const dependentStyles = genDependentGlobalStyleSheet(theme.colors);

  const handleRegister = () => {
    const errMsg = validateRegister(
      data.email,
      data.password,
      data.name,
      data.confirmPassword
    );

    console.log(errMsg);

    let error: AlertType = {
      active: true,
      error: true,
      msg: errMsg,
      title: "Something went wrong",
    };

    if (errMsg) {
      dispatch({ type: "OPEN_ALERT", payload: error });
    } else {
      connection.firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => console.log("registrado"))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={{ ...dependentStyles.Screen__Main }}>
      <ChangeTheme />
      <View
        style={{
          marginVertical: 100,
          width: "70%",
          height: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ ...dependentStyles.Title, marginBottom: 30 }}>
          Creating new account
        </Text>
        <View>
          <Text style={{ ...dependentStyles.SubTitle }}>NickName:</Text>
          <InputText
            placeholder="[example] Tony Stark"
            onChange={(text) => setData({ ...data, name: text })}
            keybordType={"email-address"}
          />
        </View>
        <View>
          <Text style={{ ...dependentStyles.SubTitle }}>Email:</Text>
          <InputText
            placeholder="[example] tonystark@gmail.com"
            onChange={(text) => setData({ ...data, email: text })}
            keybordType={"email-address"}
          />
        </View>
        <View>
          <Text style={{ ...dependentStyles.SubTitle }}>Password:</Text>
          <InputText
            placeholder="Some secret password"
            onChange={(text) => setData({ ...data, password: text })}
            keybordType={"default"}
            secureTextEntry={true}
          />
        </View>
        <View>
          <Text style={{ ...dependentStyles.SubTitle }}>Confirm Password:</Text>
          <InputText
            placeholder="Confirm the secret password"
            onChange={(text) => setData({ ...data, confirmPassword: text })}
            keybordType={"default"}
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginVertical: 40 }}>
          <Button title="Create Account" onPress={handleRegister} />
        </View>

        <View style={{ width: "70%", alignItems: "center" }}>
          <LinkRedirect
            text="I do have an acount..."
            fnRedirect={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};

export default Register;
