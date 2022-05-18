import { createStore, combineReducers } from 'redux';
import { reducer as usersReducer} from './users/reducer';
import { reducer as timeReducer} from './time/reducer';

// Combine Reducers
const rootReducer = combineReducers({
    // session: sessionReducer,
    users: usersReducer,
    time: timeReducer,
});

export const store = createStore(
  rootReducer, // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
