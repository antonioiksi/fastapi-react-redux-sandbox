import { combineReducers } from 'redux';

// Reducers
import { reducer as eventsReducer } from './events/reducer';
import { reducer as usersReducer} from './users/reducer';

// Combine Reducers
const rootReducer = combineReducers({
    // session: sessionReducer,
    users: usersReducer,
    // posts: postsReducer,
    events: eventsReducer,
});

export default rootReducer;
