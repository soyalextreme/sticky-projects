import * as React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { StoreContext } from "../state/Store";
import MessageBox from "./MessageBox";

export interface LoaderContainerProps {}

const LoaderContainer: React.FunctionComponent<LoaderContainerProps> = (
  props
) => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      {store.appState.loading && (
        <View style={ss.Loader__mainContainer}>
          <ActivityIndicator color="yellow" size="large" />
        </View>
      )}
      {store.appState.alert.active && (
        <View style={ss.Loader__mainContainer}>
          <MessageBox />
        </View>
      )}
      {props.children}
    </>
  );
};

const ss = StyleSheet.create({
  Loader__mainContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

export default LoaderContainer;
