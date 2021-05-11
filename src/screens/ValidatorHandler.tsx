import * as React from "react";
import { Text } from "react-native";
import Loader from "../components/Loader";
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
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }, 5000);
  }, []);

  if (store.appState.loading) return <Loader />;

  return (
    <>
      {store.appState.auth === undefined ? <Login /> : <Text>Bienvenido</Text>}
    </>
  );
};

export default ValidatorHandler;
