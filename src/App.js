import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TweetLog from './containers/TweetLog';
import SearchBar from './containers/SearchBar';
import Timeline from './components/Timeline';
import SearchFacets from "./components/SearchFacets";

export default () => (
	<Container>
		<Row>
			<h2>Twitter Explorer</h2>
		</Row>
		<Row>
            <Col sm={4}>
                <SearchBar />
                <SearchFacets />
				<TweetLog />
            </Col>
            <Col sm={8}>
                <Timeline />
            </Col>
		</Row>
	</Container>
);
