import React, { Dispatch } from "react";
import { ActionType, IStore } from "../../types";
import reducer from "./reducer";
import { ColorsHexaDark } from "../constants/colorsHexa";

// types

const initialState: IStore = {
  appState: {
    auth: undefined,
    alert: {
      msg: "Registrate y Disfruta de nuestra app, tenemos tema dark y ligth 💛",
      active: true,
      error: false,
      title: "Bienvenido a Sticky",
    },
    loading: false,
    theme: {
      dark: false,
      colors: ColorsHexaDark,
    },
  },
  appData: {
    catergories: [
      {
        desc: "Trabajo",
        color: "#FA897B",
      },
      {
        desc: "Escuela",
        color: "#86E3CE",
      },
    ],
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
