import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import * as serviceWorker from './serviceWorker';

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [ sagaMiddleware ];

	return {
		...createStore(rootReducer, applyMiddleware(...middleware)),
		runSaga: sagaMiddleware.run
	};
}

const store = configureStore();
store.runSaga(rootSaga);

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
