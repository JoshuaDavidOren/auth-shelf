import axios from 'axios';
import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';


function* getItems() {
    try {
      const items = yield axios.get(`/api/shelf`);
      console.log('*** getItems: *** ', items.data);
      yield put ({type: 'SET', payload: items.data});
    }
    catch (error) {
      console.log('Error in getItems:', error);
    };
  };

  function* getItemsSaga() {
    yield takeLatest('GET_ITEMS', getItems);
  };

  export default getItemsSaga;