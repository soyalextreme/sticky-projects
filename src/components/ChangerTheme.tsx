import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StoreContext } from "../state/Store";

export interface ChangeThemeProps {}

const ChangeTheme: React.FunctionComponent<ChangeThemeProps> = () => {
  const {
    store: {
      appState: {
        theme: { dark },
      },
    },
    dispatch,
  } = React.useContext(StoreContext);

  const handleChangeTheme = (): void => {
    dispatch({ type: "SET_THEME", payload: { dark: !dark } });
  };

  return (
    <TouchableOpacity
      style={{ position: "absolute", top: 30, right: 30 }}
      onPress={handleChangeTheme}
    >
      <Text style={{ fontSize: 30 }}>{!dark ? "🌞" : "🌚"}</Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: "center",
          color: !dark ? "white" : "black",
        }}
      >
        {!dark ? "Light Mode" : "Dark Mode"}
      </Text>
    </TouchableOpacity>
  );
};

export default ChangeTheme;
