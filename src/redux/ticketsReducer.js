

import * as actions from "./actions"

export const ticketsReducer = (state = {
    tickets: []
}, action) => {
    switch (action.type) {
        case actions.LOAD_TICKETS:
            return {...state, isLoading: true, errMess: null, tickets: action.payload};
        default:
            return state;
    }
};