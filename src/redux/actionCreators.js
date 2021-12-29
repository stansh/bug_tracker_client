import * as actions from './actions';


export const loadProjects = data => ({
    type: actions.LOAD_PROJECTS,
    payload: data
});

export const loadUsers = data => ({
    type: actions.LOAD_USERS,
    payload: data
});

export const loadTickets = data => ({
    type: actions.LOAD_TICKETS,
    payload: data
});

export const removeTicketRedux = ticket =>({
    type: actions.REMOVE_TICKET,
    payload: ticket
})

export const addTicketRedux = ticket =>({
    type: actions.ADD_TICKET,
    payload: ticket
})

export const updateTicketRedux = ticket =>({
    type: actions.UPDATE_TICKET,
    payload: ticket
})