

import * as actions from "./actions"

export const projectsReducer = (state = {
    isLoading:true,
    errMess:null,
    projects: [],

}, action) => {
    switch (action.type) {
        case actions.LOAD_PROJECTS:
            return {...state, isLoading: true, errMess: null, projects: action.payload};
        case actions.LOADING_PROJECTS:
            return {...state, isLoading: true, errMess: null, projects: action.payload};
        case actions.LOAD_PROJECTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, projects: []};
        default:
            return state;
    }
};