import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Input, Button, Message } from 'semantic-ui-react';

class SimpleForm extends Component {

  constructor() {
    super()
    this.submit = this.submit.bind(this);
    this.locationInput = this.locationInput.bind(this);
  }

  locationInput({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;
    return <div>
      {hasError && <Message error header='Error' content={error} />}
      <Input
        error={hasError}
        fluid
        placeholder='Location...' {...input} {...custom} />
    </div>
  }

  submit({ location }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'FETCH_WEATHER',
        location,
        resolve,
        reject
      })
    }).catch((error) => {
      // will populate new submission error field
      throw new SubmissionError(error);
    })
  }

  // shows the form
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Field name='location' component={this.locationInput} />
        <br />
        <Button fluid type='submit'>Submit</Button>
      </form>
    );
  }
}

// {location: text}
const validate = ({ location }) => {
  const errors = {};
  if (!location || location.trim() === '') {
    errors.location = 'Location Required';
  }
  return errors;
}

// form is an identifier
export default reduxForm({
  form: 'simple',
  validate
})(SimpleForm);