import axios from 'axios';

const PORT 					= (+window.location.port) + 1;
const BACKEND_URL 			= `http://${window.location.hostname}:${PORT}`;
const TWITTER_SEARCH_URL 	= `${BACKEND_URL}/query`;

const AXIOS_CONFIG = { 
	headers: { 'Content-type': 'application/json' } 
};

function* tweetRequest(keyword) {
    const requestBody = { params: { q: keyword, count: 100, result_type: "recent" } };
	const result = yield axios.get(TWITTER_SEARCH_URL, requestBody, AXIOS_CONFIG);
	const statuses = result.data.data.statuses;

	return { statuses, searchTerm: keyword };
};

const retrieveTweets = keyword => tweetRequest(keyword);

const api = {
	retrieveTweets
};

export default api;