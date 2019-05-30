import { all, fork } from 'redux-saga/effects';
import { watcherSearchTweets } from './TweetSagas';

export default function* root() {
	yield all([
		fork(watcherSearchTweets)
	]);
}