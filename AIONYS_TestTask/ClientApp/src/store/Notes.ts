import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { InferActionsTypes } from './configureStore';
import api from './api';

//type actions
const REQUEST_Notes = 'REQUEST_Notes'
const RECEIVE_Notes = 'RECEIVE_Notes'
const REQUEST_ADD_Note = 'REQUEST_ADD_Note'
const RECEIVE_ADD_Note = 'RECEIVE_ADD_Note'
const REQUEST_DELETE_Note = 'REQUEST_DELETE_Note'
const RECEIVE_DELETE_Note = 'RECEIVE_DELETE_Note'
const REQUEST_UPDATE_Note = 'REQUEST_UPDATE_Note'
const RECEIVE_UPDATE_Note = 'RECEIVE_UPDATE_Note'
const CHANGE_Language = 'CHANGE_Language'


export interface NotesState {
    isLoading: boolean,
    selectedLanguage: string,
    Notes: Note[]
}

export interface Note {
    id: number,
    description: string
}

//creators
export const actionCreators = {
    changeLanguage: (language: string) => ({
        type: CHANGE_Language,
        payload: language
    } as const),
    requestNotes: () => ({
        type: REQUEST_Notes
    } as const),
    receiveNotes: (Notes: Note[]) => ({
        type: RECEIVE_Notes,
        payload: Notes
    } as const),
    requestAddNote: () => ({
        type: REQUEST_ADD_Note
    } as const),
    receiveAddNote: (Note: Note) => ({
        type: RECEIVE_ADD_Note,
        payload: Note
    } as const),
    requestDeleteNote: () => ({
        type: REQUEST_DELETE_Note
    } as const),
    receiveDeleteNote: (id: number) => ({
        type: RECEIVE_DELETE_Note,
        payload: id
    } as const),
    requestUpdateNote: () => ({
        type: REQUEST_UPDATE_Note
    } as const),
    receiveUpdateNote: (id: number, newData: Note) => ({
        type: RECEIVE_UPDATE_Note,
        payload: { ...newData, id }
    } as const)
};

type KnownAction = InferActionsTypes<typeof actionCreators>


const API = api.RestAPI<Note>('notes/');

export const ChangeLanguage = (language: string): AppThunkAction<KnownAction> => async (dispatch) => {
    dispatch(actionCreators.changeLanguage(language));
}

export const GetAll = (): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestNotes());

    const response = await API.fetchAll();

    dispatch(actionCreators.receiveNotes(response))
}
export const Create = (newNote: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestAddNote());

    const response = await API.create(newNote)

    onSuccess();
    dispatch(actionCreators.receiveAddNote(response))
}

export const Update = (id: number, newData: any, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestUpdateNote());

    await API.update(id, newData)

    onSuccess()
    dispatch(actionCreators.receiveUpdateNote(id, newData))
}

export const Delete = (id: number, onSuccess: () => void): AppThunkAction<KnownAction> => async (dispatch) => {

    dispatch(actionCreators.requestDeleteNote())

    await API.delete(id)

    onSuccess()
    dispatch(actionCreators.receiveDeleteNote(id))
}



//reducer
const unloadedState: NotesState = {
    isLoading: false,
    Notes: [],
    selectedLanguage: ""
}

export const reducer: Reducer<NotesState> = (state: NotesState | undefined, incomingAction: Action): NotesState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case REQUEST_Notes:
            return {
                ...state, isLoading: true
            };
        case RECEIVE_Notes:
            return {
                ...state,
                isLoading: false,
                Notes: action.payload
            }
        case RECEIVE_ADD_Note:
            return {
                ...state,
                isLoading: false,
                Notes: [...state.Notes, action.payload]
            }
        case RECEIVE_UPDATE_Note:
            return {
                ...state,
                isLoading: false,
                Notes: state.Notes.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case RECEIVE_DELETE_Note:
            return {
                ...state,
                isLoading: false,
                Notes: state.Notes.filter(x => x.id !== action.payload)
            }  
        case CHANGE_Language:
            return {
                ...state,
                isLoading: false,
                selectedLanguage: action.payload
            }
    }
    return {
        ...state
    }
}