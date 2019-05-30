import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { retrieveTweets } from '../actions/tweetActions';

const mapStateToProps = state => {
	const statusesObj = state.tweets.statuses;
	const statusesArr = [];
	for (var id in statusesObj) {
    	if (statusesObj.hasOwnProperty(id)) {
        	statusesArr.push(statusesObj[id]);
    	}
	}
	return {
		tweets: statusesArr
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onKeywordSearch: keyword => dispatch(retrieveTweets(keyword)),
		onRetrieveTweets: () => dispatch(retrieveTweets())
	};
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(SearchBar);