import * as actions from './actions';


export const loadProjects = data => ({
    type: actions.LOAD_PROJECTS,
    payload: data
});

export const loadUsers = data => ({
    type: actions.LOAD_USERS,
    payload: data
});
