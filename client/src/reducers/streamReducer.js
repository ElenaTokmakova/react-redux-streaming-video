import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';


// syntax for adding new key-values pairs to an object
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
    // this is how the array gets transformed into a lookup object
    // map Keys returns a big object, and we want to add the key-value pairs and add to the new big overall object
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // deleteStream action creator is dispathcing an action with an id on the payload property
      // specify the key to drop off the object
      // omit creates a new object
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
