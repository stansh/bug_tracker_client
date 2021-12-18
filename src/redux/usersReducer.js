

import * as actions from "./actions"


export const usersReducer = (state = {
    users: []
}, action) => {
    
    switch (action.type) {
        case actions.LOAD_USERS:
            return {...state, isLoading: true, errMess: null, users: action.payload};
        default:
            return state;
    }
};