import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StoreContext } from "../state/Store";
import { ProgressBar, Colors, Button } from "react-native-paper";

export interface MessageBoxProps {}

const MessageBox: React.FunctionComponent<MessageBoxProps> = () => {
  const {
    store: {
      appState: { alert },
    },
    dispatch,
  } = React.useContext(StoreContext);

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_ALERT", payload: {} });
  };

  return (
    <View style={ss.MessageBox__container}>
      <Text style={ss.MessageBox__title}>{alert.title}</Text>
      <Text style={ss.MessageBox__body}>{alert.msg}</Text>
      <TouchableOpacity
        style={ss.MessageBox__Button}
        onPress={handleCloseModal}
      >
        <Text>OK!</Text>
      </TouchableOpacity>
    </View>
  );
};

const ss = StyleSheet.create({
  MessageBox__container: {
    backgroundColor: "white",
    borderColor: "yellow",
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
    borderRadius: 30,
    width: "80%",
  },

  MessageBox__title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  MessageBox__body: {
    marginVertical: 25,
    textAlign: "center",
  },
  MessageBox__Button: {
    backgroundColor: "yellow",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
});

export default MessageBox;
