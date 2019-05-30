import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ADD_KEYWORDS,
	TWEET_SEARCH_REQUEST, 
	TWEET_SEARCH_REQUEST_SUCCESS,
	TWEET_SEARCH_REQUEST_FAILURE } from '../constants/actionTypes';
import api from '../services';

//const getPlaces = state => state.tweets.places;

function* workerSearchTweets(action) {
	try {
        const searchData = yield call(api.retrieveTweets, action.keyword);

		yield put({ type: TWEET_SEARCH_REQUEST_SUCCESS, searchData, updated: action.updated });
		yield put({ type: ADD_KEYWORDS, searchTerm: action.keyword });
	} catch (e) {
	 	yield put({type: TWEET_SEARCH_REQUEST_FAILURE, message: e.message});
	}
};

// watcher Saga
export function* watcherSearchTweets() {
	yield takeLatest(TWEET_SEARCH_REQUEST, workerSearchTweets);
};