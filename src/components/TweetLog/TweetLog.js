import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default ({ statusesDb, searchTerms }) => {
    const groups = Object.keys(searchTerms);
    const statuses = groups.reduce((accum, group) => {
        accum[group] = searchTerms[group].map(tweetId => statusesDb[tweetId]);
        return accum;
    }, {});

    return (
        <ListGroup>
            { groups.map(group => statuses[group].slice(0, 5).map( (data, index) => 
                <ListGroupItem key={ index } >{ `${data.user.name}: ${data.text}` }</ListGroupItem>
            )) }
        </ListGroup>
    );
};