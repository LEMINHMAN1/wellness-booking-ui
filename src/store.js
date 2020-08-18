import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(initialState = {}) {

  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
  } else {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk),
      )
    );
  }

}


