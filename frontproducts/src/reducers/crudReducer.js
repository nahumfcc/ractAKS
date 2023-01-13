import {
    CREATE_DATA,
    DELETE_DATA,
    NO_DATA,
    READ_ALL_DATA,
    READ_SINGLE_DATA,
    UPDATE_DATA } from "../types/index";

export const initialState = {
    localDb: [],
};

export function crudReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_DATA: {
            return {
                ...state,
                localDb: action.payload.map((data)=> data),
            };
        }
        case READ_SINGLE_DATA: {
            let newData = state.localDb.filter((el) => el.id === action.payload);
            return {
                newData,
            };
        }
        case CREATE_DATA: {
            return {
                ...state,
                localDb: [...state.localDb, action.payload],
            };
        }
        case UPDATE_DATA: {
            let newData = state.localDb.map((el) =>
                el.id === action.payload.id ? action.payload : el
            );

            return {
                ...state,
                localDb: newData,
            };
        }
        case DELETE_DATA: {
            let newData = state.localDb.filter((el) => el.id !== action.payload);

            return {
                ...state,
                localDb: newData,
            };
        }
        case NO_DATA:
            return initialState;
        default:
            return state;
    }
}