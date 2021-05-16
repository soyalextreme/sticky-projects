// dev types, interface for the app
// 10-May-2021 
// Author: Alejandro AS.

export type AlertType = {
    active: boolean;
    msg: string;
    title: string;
    error: boolean;
}

export type AuthType = {
    uid: string;
    name: string;
    email: string;
}

export type ProjectType = {
    name: string;
    id: string;
    description: string;
}

export type StickyTimerNoteType = {
    body: string;
    timeFraction: number;
    id: string;
    title: string;
}

export type StickyDefaulNoteType = {
    title: string;
    body: string;
    done: boolean;
    id: string;
}

export type CategoriesType = {
    desc: string;
    color: string;
    id: string;
}

export interface IAppState {
    loading: boolean;
    alert: AlertType;
    auth: undefined | AuthType;
    theme: {
        dark: boolean,
        colors: any,
    };
    notification: {
        tokenPush: string;
        pushNotification: (token: string, message: notiticationMessageContentType) => void;
    }
}


export interface IAppData {
    projects: Array<ProjectType>;
    stickyTimerNotes: Array<StickyTimerNoteType>;
    stickyDefaultNote: Array<StickyDefaulNoteType>;
    catergories: Array<CategoriesType>;
}

export interface IStore {
    appState: IAppState;
    appData: IAppData;
}

export type ActionType = {
    type: string,
    payload: PayloadLoadingType | any,
}

export type notiticationMessageContentType = {
    title: string,
    body: string,
}


// payloads for reducer

export type PayloadLoadingType = {
    loading: boolean;
}


export type ColorEnumType = {
    primary: string;
    secondary: string;
    background: string;
    alternative: string;
}