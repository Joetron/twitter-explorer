import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import tweets from './TweetsReducer';

const rootReducer = combineReducers({ form, tweets });

export default rootReducer;