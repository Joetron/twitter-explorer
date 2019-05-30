import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { removeSearchTerm } from "../../actions/tweetActions";

class SearchFacets extends PureComponent {
    render() {
        const { facets, onRemoveFacet } = this.props;

        return (
            <Fragment>
                {Object.keys(facets).map(term =>
                    <div style={{ display: "inline-block", marginRight: 10, marginBottom: 10 }}>
                        <Button key={term} onClick={() => onRemoveFacet(term)} variant="primary">
                            {term}
                        </Button>
                    </div>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({ facets: state.tweets.searchTerms });
const mapDispatchToProps = dispatch => ({
    onRemoveFacet: term => dispatch(removeSearchTerm(term))
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchFacets);