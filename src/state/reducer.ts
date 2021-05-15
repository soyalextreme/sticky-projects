import React, { PropsWithChildren, useReducer } from "react"
import { AppState } from "react-native";
import { ActionType, IStore } from "../../types";


const reducer = (state: IStore, action: ActionType): IStore => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state, appState: {
                    ...state.appState, loading: action.payload.loading
                },
            }
        case 'SET_THEME':
            return {
                ...state, appState: {
                    ...state.appState, theme: {
                        ...state.appState.theme, dark: action.payload.dark,
                    }
                }
            }
        case 'UPDATE_THEME': {
            return {
                ...state, appState: {
                    ...state.appState, theme: {
                        ...state.appState.theme,
                        colors: action.payload.colors
                    }
                }
            }
        }
        case "CLOSE_ALERT": {
            return {
                ...state, appState: {
                    ...state.appState, alert: {
                        active: false,
                        msg: "",
                        error: false,
                        title: "",
                    }
                }
            }
        }
        case 'SET_PUSH_NOTIFICATIONS': {
            return {
                ...state, appState: {
                    ...state.appState, notification: { ...action.payload }
                }
            }
        }
        case 'SET_AUTH': {
            return {
                ...state, appState: {
                    ...state.appState, auth: action.payload
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;