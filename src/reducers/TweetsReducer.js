import {
    TWEET_SEARCH_REQUEST_SUCCESS,
    TWEET_SEARCH_REMOVE_TERM
} from '../constants/actionTypes';
import convert from "../adapters/d3Timeline";

const initialState = {
    timelineData: {},
    updated: 0,
    statusesDb: {},
    searchTerms: {}
};

const mergeArries = (a1 = [], a2 = []) => {
    const mergedArray = a1.concat(a2);
    const mergedSet = new Set(mergedArray);

    return Array.from(mergedSet);
};

// https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
export default function tweetReducer(state = initialState, action) {
	switch (action.type) {
        case TWEET_SEARCH_REQUEST_SUCCESS:
            const {
                searchTerm,
                statuses: newStatuses
            } = action.searchData;

            const newDb = newStatuses.reduce((ac, cur) => {
                ac[cur.id_str] = cur;
                return ac;
            }, {});

            const statusesDb = { ...newDb, ...state.statusesDb };
            const tweetIds = Object.keys(statusesDb);
            
            const updatedTerms = {
                ...state.searchTerms,
                [searchTerm]: mergeArries(state.searchTerms[searchTerm], tweetIds)
            };

            const newState = {
                updated: action.updated,
                statusesDb,
                searchTerms: updatedTerms
            };

            const timelineData = convert(newState);
            
            return { ...newState, timelineData };
        case TWEET_SEARCH_REMOVE_TERM:
            const removeSearchTerms = { ...state.searchTerms };
            delete removeSearchTerms[action.term];
            
            const removedState = {
                ...state,
                searchTerms: removeSearchTerms,
                updated: action.updated
            };

            return { ...removedState, timelineData: convert(removedState) };
		default:
			return state;
	}
}