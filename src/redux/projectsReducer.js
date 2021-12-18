

import * as actions from "./actions"

export const projectsReducer = (state = {
    projects: []
}, action) => {
    switch (action.type) {
        case actions.LOAD_PROJECTS:
            return {...state, isLoading: true, errMess: null, projects: action.payload};
        default:
            return state;
    }
};