import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ValidatorHandler from "./src/screens/ValidatorHandler";
import StoreProvider from "./src/state/Store";

export default function App() {
  return (
    <StoreProvider>
      <ValidatorHandler />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
