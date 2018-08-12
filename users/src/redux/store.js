import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer'

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
	const { logger } = require(`redux-logger`);
	middlewares.push(logger);
}

// const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

const store = createStore(reducer, composeWithDevTools(
	applyMiddleware(...middlewares),
));

export default store