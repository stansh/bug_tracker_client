import * as actions from './actions';


export const loadProjects = data => ({
    type: actions.LOAD_PROJECTS,
    payload: data
});


export const loadingProjects = ()=> ({
    type: actions.LOADING_PROJECTS
   
});

export const loadProjectsFailed = err => ({
    type: actions.LOAD_PROJECTS_FAILED,
    payload: err
});



export const loadUsers = data => ({
    type: actions.LOAD_USERS,
    payload: data
});

export const loadingUsers = ()=> ({
    type: actions.LOADING_USERS
});

export const loadUsersFailed = err => ({
    type: actions.LOAD_USERS_FAILED,
    payload: err
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
    const token = localStorage.getItem("token");
    dispatch(loadingProjects());
    fetch ( "/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }          
    })
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
    const token = localStorage.getItem("token"); 
    dispatch(loadingTickets());
    fetch( "/tickets", {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
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
    const token = localStorage.getItem("token");      
    dispatch(loadTicketsFailed());
    fetch( "/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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
    .then(res => dispatch(loadUsers(res)))
    .catch(error => console.log(error)) 
};



