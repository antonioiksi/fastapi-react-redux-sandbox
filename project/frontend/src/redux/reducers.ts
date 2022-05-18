import { combineReducers } from 'redux';

// Reducers
import { reducer as usersReducer} from './users/reducer';
import { reducer as timeReducer} from './time/reducer';

// Combine Reducers
const rootReducer = combineReducers({
    // session: sessionReducer,
    users: usersReducer,
    time: timeReducer,
});

export default rootReducer;
