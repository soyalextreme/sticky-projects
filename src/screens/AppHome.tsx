import * as React from "react";
import { Text } from "react-native";
import LinkRedirect from "../components/LinkRedirect";
import connection from "../db/connection";

export interface AppHomeProps {}

const AppHome: React.FunctionComponent<AppHomeProps> = () => {
  return (
    <>
      <Text>Home App</Text>
      <LinkRedirect
        text="Cerrar Sesion"
        fnRedirect={() => connection.firebase.auth().signOut()}
      />
    </>
  );
};

export default AppHome;
