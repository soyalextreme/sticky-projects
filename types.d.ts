// dev types, interface for the app
// 10-May-2021 
// Author: Alejandro AS.

export type ErrorType = {
    active: boolean;
    msg: string;
}

export type AuthType = {
    uid: string,
    name: string,
    email: string,
}

export interface IAppState {
    loading: boolean;
    error: ErrorType;
    auth: undefined | AuthType;
}

export interface IStore {
    appState: IAppState;
}

export type ActionType = {
    type: string,
    payload: PayloadLoadingType | any,
}



// payloads for reducer

export type PayloadLoadingType = {
    loading: boolean;
}