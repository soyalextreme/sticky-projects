import React, { Dispatch } from "react";
import { ActionType, IStore } from "../../types";
import reducer from "./reducer";
import { ColorsHexaDark } from "../constants/colorsHexa";

// types

const initialState: IStore = {
  appState: {
    auth: undefined,
    alert: {
      msg: "",
      active: false,
      error: false,
      title: "",
    },
    loading: false,
    theme: {
      dark: false,
      colors: ColorsHexaDark,
    },
    notification: {
      tokenPush: "",
      pushNotification: () => {},
    },
  },
  appData: {
    catergories: [],
    projects: [],
    stickyDefaultNote: [],
    stickyTimerNotes: [],
  },
};

const initDispatch: Dispatch<ActionType> = () => {};

export const StoreContext = React.createContext({
  store: initialState,
  dispatch: initDispatch,
});

export interface IPropsProvider {
  children: any;
}
const StoreProvider = (props: IPropsProvider) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
