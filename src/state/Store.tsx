import React, { Dispatch } from "react";
import { ActionType, IStore } from "../../types";
import reducer from "./reducer";

// types

const initialState: IStore = {
  appState: {
    auth: {
      email: "",
      uid: "",
      name: "",
    },
    error: {
      msg: "",
      active: false,
    },
    loading: false,
  },
};

const initDispatch: Dispatch<ActionType> = () => {};

export const StoreContext = React.createContext([initialState, initDispatch]);

export interface IPropsProvider {
  children: any;
}
const StoreProvider = (props: IPropsProvider) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
