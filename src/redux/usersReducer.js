

import * as actions from "./actions"


export const usersReducer = (state = {
    isLoading:true,
    errMess:null,
    users: []
}, action) => {
    
    switch (action.type) {
        case actions.LOAD_USERS:
            return {...state, isLoading: false, errMess: null, users: action.payload};
        case actions.LOADING_USERS:
            return {...state, isLoading: true, errMess: null, users: []};
        case actions.LOAD_USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, users: []};
        default:
            return state;
    }
};