import * as React from "react";
import { Text } from "react-native";
import LoaderContainer from "../components/LoaderContainer";
import { ColorsHexaDark, ColorsHexaLight } from "../constants/colorsHexa";
import { StoreContext } from "../state/Store";
import Login from "./Login";

export interface ValidatorHandlerProps {}

const ValidatorHandler: React.FunctionComponent<ValidatorHandlerProps> = () => {
  const { useContext, useEffect } = React;

  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    // theme handles useEffect
    if (store.appState.theme.dark) {
      dispatch({ type: "UPDATE_THEME", payload: { colors: ColorsHexaDark } });
    } else {
      dispatch({ type: "UPDATE_THEME", payload: { colors: ColorsHexaLight } });
    }
  }, [store.appState.theme.dark]);

  useEffect(() => {
    // validate the user auth
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }, 5000);
  }, []);

  return (
    <LoaderContainer>
      {store.appState.auth === undefined ? <Login /> : <Text>Bienvenido</Text>}
    </LoaderContainer>
  );
};

export default ValidatorHandler;
