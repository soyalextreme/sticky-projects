import * as React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export interface LoaderProps {
  specs?: {
    color: string;
    size: "small" | "large" | undefined;
  };
}

const Loader: React.FunctionComponent<LoaderProps> = ({ specs }) => {
  return (
    <View style={ss.Loader__mainContainer}>
      <ActivityIndicator {...specs} />
    </View>
  );
};

const ss = StyleSheet.create({
  Loader__mainContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default Loader;
