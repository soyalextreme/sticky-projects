import React, { PropsWithChildren, useReducer } from "react"
import { ActionType, IStore } from "../../types";


const reducer = (state: IStore, action: ActionType): IStore => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state, appState: { ...state.appState, loading: action.payload.loading },
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;