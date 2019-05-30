import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './Input';

class SearchBar extends Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentDidMount() {
		//this.props.onRetrieveTweets();
	}

	onSubmit(values) {
		this.props.onKeywordSearch(values.keyword || "");
		this.props.reset();
	}

	onCancel() {
		this.props.reset();
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmit) }>
				<Field
					name="keyword"
					component={ Input }  
					label="Search Tweets"
					type="text"
					disabled={ false }
				/>
			</form>
		);
	}
}

function warn(values) {
	const warnings = {};

	if (values.keyword && values.keyword.length < 4) {
		//warnings.keyword = "Enter at least 10 characters, this is just test warning";
	}

	return warnings;
}

function validate(values) {
	const errors = {};

	if (values.keyword && values.keyword.length < 1) {
		//errors.keyword = "Enter at least 10 characters, this is just test validation";
	}

	return errors;
}

export default reduxForm({
	validate, warn,
	form: 'SearchForm'
})(SearchBar);