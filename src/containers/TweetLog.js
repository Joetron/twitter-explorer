import { connect } from 'react-redux';
import TweetLog from '../components/TweetLog';

const mapStateToProps = state => state.tweets;

export default connect(
	mapStateToProps
)(TweetLog);