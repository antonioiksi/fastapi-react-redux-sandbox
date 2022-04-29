import { combineReducers } from 'redux';

// Reducers
import { reducer as eventsReducer } from './events/reducer';

// Combine Reducers
const rootReducer = combineReducers({
    // session: sessionReducer,
    // users: usersReducer,
    // posts: postsReducer,
    events: eventsReducer,
});

export default rootReducer;
