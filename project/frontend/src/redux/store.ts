import { createStore, combineReducers } from 'redux';

import { reducer as eventsReducer } from './events/reducer';

// Combine Reducers
const rootReducer = combineReducers({
    // session: sessionReducer,
    // users: usersReducer,
    // posts: postsReducer,
    events: eventsReducer,
});

export const store = createStore(
  rootReducer,
  // {
  //     submittedValue: ')sdrawkcaB ti daeR( Nothing has been submitted yet'
  // },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
