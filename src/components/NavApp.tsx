import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StoreContext } from "../state/Store";

export interface NavAppProps {
  navigation: any;
}

const NavApp: React.FunctionComponent<NavAppProps> = ({ navigation }) => {
  const NAV_OPTIONS = [
    {
      title: "Projects",
      redirect: "Projects",
    },
    // { title: "Quick Notes", redirect: "Quick Notes" },
    { title: "Categories", redirect: "Categories" },
  ];

  const {
    store: {
      appState: { theme },
    },
    dispatch,
  } = React.useContext(StoreContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors.alternative,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 60,
        paddingVertical: 20,
      }}
    >
      {NAV_OPTIONS.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            navigation.navigate(item.redirect);
            dispatch({ type: "SET_LOADING", payload: { loading: true } });
          }}
        >
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavApp;
