

import * as actions from "./actions"

export const ticketsReducer = (state = {
    tickets: []
}, action) => {
    switch (action.type) {
        case actions.LOAD_TICKETS:
            return {...state, isLoading: true, errMess: null, tickets: action.payload};
        case actions.ADD_TICKET:
            return {...state, isLoading: true, errMess: null, tickets: state.tickets.concat(action.payload)};
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
                        //tic.comments.push(newComment)
                        tic.comments = action.payload.comments
                    }
                    return tic
                })
            } 
          
            
        default:
            return state;
    }
};