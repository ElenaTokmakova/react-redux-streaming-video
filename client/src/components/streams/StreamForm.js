import React from 'react';
// Field is a React component, reduxForm is a function like the connect function
// so that we can call some action creators and get some form data to our component
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  // Redux Form will look at every Field's name property
  // and then at the errors object returned from Validate
  // if they match, Redux Form will take that error message and pass it to our renderInput() function
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // a set of properties is passed in
  // {...input} = value, onChange
  // formProps get passed in
  // onChange={formProps.input.onChange}
  // value={formProps.input.value}
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`; // the entire field will show up as red
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // should call a callback passed down from props from some parent component
  // we now expect a parent component to pass down a callback called onSubmit
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    // ReduxForm props
    // Field is only about hooking up the structure, it can be any type of input
    // all the props are going to be passed to the renderInput() function
    // there is a function called handleSubmit()
    return (
      <form
      // onSubmit is the name of the prop we are passing down to the form
      // handleSubmit is a callback function provided to our component by Redux Form
      // call that function with our callback method
      // handleSubmit() will automatically receive the event and call preventDefault() behind the scenes
      // handleSubmit() will be called with the event, will process the event
      // then the callback will be called with the actual form values
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error" // needs this className or errors will be hidden
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// every single time the form is rendered to the screen
// every single time the user interacts with the form
// the validate function is going to be called with all the current values in the form
// check if the user input valid or invalid input
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

// reduxForm returns a functions
// we immediately call this function with streamCreate
export default reduxForm({
  // provide a name for the form
  form: 'streamForm',
  validate // validate : validate
})(StreamForm);
