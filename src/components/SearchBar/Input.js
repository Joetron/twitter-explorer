import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export default class Input extends Component {
    
    // TODO: migrate to formik and yup
    getValidationState(error, warning, touched, disabled) {
        let validationState;

        if (touched && error) {
            validationState = "error";
        } else if (touched && warning) {
            validationState = "warning";
        } else if (touched && !disabled) {
            validationState = "success";
        }

        return validationState;
    }

    getHelpMessage(error, warning, touched) {
        let message;

        if ( touched && (error || warning) ) {
            message = error || warning;
        } else {
            message = "Hit enter when done"
        }

        return message;
    }

    render () {
        const {
            input,
            label,
            type,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        // do not unpack disabled as we need it later 
        const disabled = this.props.disabled;

        return (
            <Form.Group validationState={ this.getValidationState(error, warning, touched, disabled) }>
                <Form.Label>{ label }</Form.Label>
                <Form.Control { ...input }
                    type={ type }
                    { ...props }
                    placeholder="Enter text"
                />
                <Form.Control.Feedback>{ this.getHelpMessage(error, warning, touched) }</Form.Control.Feedback>
            </Form.Group>
        );
    }
}