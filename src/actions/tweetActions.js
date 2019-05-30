import { TWEET_SEARCH_REQUEST, TWEET_SEARCH_REMOVE_TERM } from '../constants/actionTypes';

export const retrieveTweets = keyword => {
	return {
        type: TWEET_SEARCH_REQUEST,
        keyword,
        updated: +new Date()
	};
};

export const searchTweets = keyword => {
	return {
		type: TWEET_SEARCH_REQUEST, keyword
	};
};

export const removeSearchTerm = term => {
    return {
        type: TWEET_SEARCH_REMOVE_TERM,
        term,
        updated: +new Date()
    };
};