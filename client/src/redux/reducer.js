import { combineReducers } from 'redux';
import { REQUEST_USERS } from './actions'
import { makeReducer } from './lib'
import {userReducer} from './user.reducer'

const rootReducer = combineReducers({
	user: userReducer,
	users: makeReducer(REQUEST_USERS)
});

export default rootReducer;
