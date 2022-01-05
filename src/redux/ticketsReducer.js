

import * as actions from "./actions"

export const ticketsReducer = (state = {
    tickets: [],
    searchResults:null
}, action) => {
    switch (action.type) {
        case actions.LOAD_TICKETS:
            return {...state, isLoading: true, errMess: null, tickets: action.payload};
        case actions.ADD_TICKET:
            let newTicket = action.payload.res;
            newTicket.assignee = action.payload.assignee;
            newTicket.project = action.payload.project;
            console.log(newTicket )

            return {...state, isLoading: true, errMess: null, tickets: state.tickets.concat(newTicket)};
        case actions.REMOVE_TICKET:
            const updatedTickets = state.tickets.filter(tic => tic._id !== action.payload._id)
            return {...state, isLoading: true, errMess: null, tickets: updatedTickets};
        case actions.UPDATE_TICKET:
            
            // const newComment = action.payload.comments.pop()
          // console.log(newComment )
          
             return{...state,
                tickets: state.tickets.map(tic=> {
                    if(tic._id === action.payload._id) {
                        tic.assignee = action.payload.assignee;
                        tic.comments = action.payload.comments;
                        tic.priority = action.payload.priority
                    }
                    return tic
                })
            };
        case actions.SAVE_SEARCH_RESULTS:
            console.log(action.payload)
            return {...state, isLoading: false, errMess: null, searchResults: action.payload};    
        
            
        default:
            return state;
    }
};