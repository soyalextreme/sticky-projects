
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
        case "OPEN_ALERT": {
            return {
                ...state, appState: {
                    ...state.appState, alert: action.payload
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
        case "ADD_PROJECT": {
            return {
                ...state, appData: {
                    ...state.appData, projects: [
                        ...state.appData.projects, action.payload,
                    ]
                }
            }
        }

        case "SET_PROJECTS": {
            return {
                ...state, appData: {
                    ...state.appData, projects: [
                        ...action.payload,
                    ]
                }
            }
        }

        case "ADD_CATEGORY": {
            return {
                ...state, appData: {
                    ...state.appData, catergories: [
                        ...state.appData.catergories,
                        action.payload
                    ]
                }
            }
        }

        case "REPLACE_CATEGORIES": {
            return {
                ...state, appData: {
                    ...state.appData, catergories: [
                        ...action.payload
                    ]
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

        case 'SET_NOTES': {
            return {
                ...state, appData: {
                    ...state.appData, stickyDefaultNote: action.payload
                }
            }
        }
        case 'ADD_NOTES': {
            return {
                ...state, appData: {
                    ...state.appData, stickyDefaultNote: [
                        ...state.appData.stickyDefaultNote, action.payload
                    ]
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