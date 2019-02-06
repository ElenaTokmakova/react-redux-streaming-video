import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  // props passed from Router include history, location, match; match includes params
  // every component should fetch its own data
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // callback for StreamForm
  // when the user eventually submits the form
  // this thing is going to receive some form values
  // Redux Form processes events into form values behind the scenes
  // formValues are only supposed to contain properties that are supposed to change on our form
  // formValues are supposed to tell us about the set of changes we are supposed to make to the form
  // some properties like ids are not supposed to ever change
  // the change set is not supposed to contain an id, for example
  // formValues are the changed properties of the stream
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      // initialProps is a special propert name with Redux Form
      // will be used as initial values for the form
      // Field components have names title and description
      // Redux Form helper sees this prop of initial values
      // it sees that it is an object with a title and a description property
      // when the StreamForm is rendered, we have a Field with the name of title and a Field with the name of description
      // don't put the full stream object there!
      // otherwise the change set will contain properties it's not supposed to contain
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// ownProps is a reference to the component's props
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);

// when we are passing props to StreamCreate, we are not technically passing props to our component
// we are passing props to Redux Form
// Redux Form then passes the props into the component
// one special props is initialValues