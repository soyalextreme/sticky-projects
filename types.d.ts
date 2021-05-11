// dev types, interface for the app
// 10-May-2021 
// Author: Alejandro AS.

export type ErrorType = {
    active: boolean;
    msg: string;
}

export type AuthType = {
    uid: string;
    name: string;
    email: string;
}

export type ProjectType = {
    name: string;
    uid: string;
    description: string;
}

export type StickyTimerNoteType = {
    body: string;
    timeFraction: number;
}

export type StickyDefaulNoteType = {
    title: string;
    body: string;
    done: boolean;
}

export type CategoriesType = {
    desc: string;
    color: string;
}

export interface IAppState {
    loading: boolean;
    error: ErrorType;
    auth: undefined | AuthType;
    theme: {
        dark: boolean,
        colors: any,
    };
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



// payloads for reducer

export type PayloadLoadingType = {
    loading: boolean;
}