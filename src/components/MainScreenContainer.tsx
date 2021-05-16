import * as React from "react";
import { View } from "react-native";
import { StoreContext } from "../state/Store";
import { genDependentGlobalStyleSheet } from "../styles/globalDependtStyles";

export interface MainScreenContainerProps {}

const MainScreenContainer: React.SFC<MainScreenContainerProps> = ({
  children,
}) => {
  const {
    store: {
      appState: { theme },
    },
  } = React.useContext(StoreContext);

  const globalStyles = genDependentGlobalStyleSheet(theme.colors);

  return (
    <View style={{ ...globalStyles.Screen__Main, padding: 40 }}>
      {children}
    </View>
  );
};

export default MainScreenContainer;
