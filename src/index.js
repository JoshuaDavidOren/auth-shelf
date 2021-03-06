import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './redux/reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas/_root.saga'; // imports ./redux/sagas/index.js

import App from './components/App/App';
import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';


// function* watcherSaga(){
// yield takeEvery('DELETE_YOUR_ITEM', deleteYourItem);
// };

// function* deleteYourItem(action) {
//   const id = action.payload;
//   try{ yield call(axios.delete, `/api/shelf/${id}`);
//   } catch (error) {
//     console.log(('Error DELETING', error));
//   };
// };

// function* addItem(action) {
//   const item = action.payload;
//   try {
//     yield call (axios.post, `/api/shelf/${item}`);
//     yield put ({type: 'ADD', payload: item});
//   }
//   catch (error) {
//     console.log('Error in addItem:', addItem);
//   };
// };

// const itemListReducer = (state = [], action) => {
//   if( action.type === 'ADD'){
//     return state = [...state, action.payload];
//   }
//   return state
// }

const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  rootReducer,
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
