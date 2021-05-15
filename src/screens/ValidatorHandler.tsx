import * as React from "react";
import NavigationController from "../NavigationController";
import LoaderContainer from "../components/LoaderContainer";
import { ColorsHexaDark, ColorsHexaLight } from "../constants/colorsHexa";
import { StoreContext } from "../state/Store";
import AppNavigationController from "../AppNavigationController";

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
    // loading true
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    // validate user

    // set user

    // loading false
    dispatch({ type: "SET_LOADING", payload: { loading: false } });
  }, []);

  console.log(store.appState);

  return (
    <LoaderContainer>
      {store.appState.auth === undefined ? (
        <NavigationController />
      ) : (
        <AppNavigationController />
      )}
    </LoaderContainer>
  );
};

export default ValidatorHandler;
