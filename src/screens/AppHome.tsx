import * as React from "react";
import { Text, View } from "react-native";
import ChangeTheme from "../components/ChangerTheme";
import LinkRedirect from "../components/LinkRedirect";
import NavApp from "../components/NavApp";
import connection from "../db/connection";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";

export interface AppHomeProps {
  navigation: any;
}

const AppHome: React.FunctionComponent<AppHomeProps> = ({ navigation }) => {
  const {
    dispatch,
    store: {
      appState: { theme, auth },
    },
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    // mensaje de bienvenida a la app

    let messageIntroductions = {
      msg: "Registrate y Disfruta de nuestra app, tenemos tema dark y ligth 💛",
      active: true,
      error: false,
      title: "Bienvenido a Sticky",
    };

    setTimeout(
      () => dispatch({ type: "OPEN_ALERT", payload: messageIntroductions }),
      2000
    );
  }, []);

  const dependetStyles = genDependentGlobalStyleSheet(theme.colors);

  const handleLogout = () => {
    connection.firebase.auth().signOut();

    dispatch({ type: "REPLACE_CATEGORIES", payload: [] });
    dispatch({ type: "SET_PROJECTS", payload: [] });
  };

  return (
    <View style={{ ...dependetStyles.Screen__Main }}>
      <NavApp navigation={navigation} />
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ ...dependetStyles.Title }}>Welcome, Lets Start! </Text>
        <Text style={dependetStyles.Text}>
          Hope you get more productive and achive your goal. 🌟
        </Text>
        <View style={{ width: "50%", marginVertical: 20 }}>
          <LinkRedirect text="Logout Now" fnRedirect={handleLogout} />
        </View>
      </View>
      <ChangeTheme />
    </View>
  );
};

export default AppHome;
