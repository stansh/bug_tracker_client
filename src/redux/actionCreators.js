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

export const loadingTickets = ()=> ({
    type: actions.LOADING_TICKETS
   
});

export const loadTicketsFailed = err => ({
    type: actions.LOAD_TICKETS_FAILED,
    payload: err
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

export const saveSearchResults = data => ({
    type:actions.SAVE_SEARCH_RESULTS,
    payload: data
})

//fetch project data
 export const getProjectsData = () => dispatch => { 
    //export const getProjectsData = () => { 
            
        //dispatch(productsLoading());
        fetch( "/projects")
            .then(response => {
            if (response.ok) { 
                
                return response
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);  
                error.response = response;
                throw error;
            }
            },
                error => { 
                    const errMess = new Error(error.message);
                    throw errMess;
                    }
            )
        .then(res => res.json())
        .then(res => dispatch(loadProjects(res)))
        .catch(error => console.log(error)) 
        };


//fetch tickets data

export const getTicketsData = () => dispatch => { 
    //dispatch(productsLoading());
    fetch( "/tickets")
        .then(response => {
        if (response.ok) { 
            return response
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);  
            error.response = response;
            throw error;
        }
        },
            error => { 
                const errMess = new Error(error.message);
                throw errMess;
                }
        )
    .then(res => res.json())
    .then(res => dispatch(loadTickets(res)))
    .catch(error => console.log(error)) 
    };

// fetch users data

export const getUsersData = () => dispatch => { 
    
            
        //dispatch(productsLoading());
        fetch( "/users")
            .then(response => {
            if (response.ok) { 
               // console.log(response)
                return response
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);  
                error.response = response;
                throw error;
            }
            },
                error => { 
                    const errMess = new Error(error.message);
                    throw errMess;
                    }
            )
        .then(res => res.json())
        .then(res => dispatch(loadUsers(res)))
        .catch(error => console.log(error)) 
        };


// get specific ticket
export const getSpecTicketData = (id) => dispatch => { 
        //dispatch(productsLoading());
        fetch( `/tickets/${id}`)
            .then(response => {
            if (response.ok) { 
                return response
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);  
                error.response = response;
                throw error;
            }
            },
                error => { 
                    const errMess = new Error(error.message);
                    throw errMess;
                    }
            )
        .then(res => res.json())
        .then(res => dispatch(loadTickets(res)))
        .catch(error => console.log(error)) 
        };