import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { projectsReducer } from "./projectsReducer";
import { usersReducer } from "./usersReducer";
import { ticketsReducer } from "./ticketsReducer";

const rootReducer = combineReducers({
  projectsReducer,
  usersReducer,
  ticketsReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk, logger)),
   
)



 