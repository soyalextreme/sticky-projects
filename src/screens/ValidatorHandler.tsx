import * as React from "react";
import NavigationController from "../NavigationController";
import LoaderContainer from "../components/LoaderContainer";
import { ColorsHexaDark, ColorsHexaLight } from "../constants/colorsHexa";
import { StoreContext } from "../state/Store";
import AppNavigationController from "../AppNavigationController";
import connection from "../db/connection";
import firebase from "firebase";

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
    // useEffect handles auth from firebase
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    connection.firebase.auth().onAuthStateChanged((response) => {
      try {
        const { uid, email, displayName } = response as firebase.User;
        dispatch({
          type: "SET_AUTH",
          payload: { name: displayName, uid, email },
        });
      } catch (error) {
        dispatch({ type: "SET_AUTH", payload: undefined });
      }
    });

    setTimeout(
      () => dispatch({ type: "SET_LOADING", payload: { loading: false } }),
      3000
    );
  }, []);

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
