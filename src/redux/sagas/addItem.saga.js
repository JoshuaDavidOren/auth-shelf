import axios from 'axios';
import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';


function* addItem(action) {
    const item = action.payload;
    console.log(item);
    try {
        yield call (axios.post, `/api/shelf`, action.payload);
        yield put ({type: 'GET_ITEMS'});
    }
    catch (error) {
      console.log('Error in addItem:', error);
    };
  };

  function* deleteYourItem(action) {
    const id = action.payload;
    try {
      yield call(axios.delete, `/api/shelf/${id}`);
      yield put ({type: 'GET_ITEMS'});
    }
    catch (error) {
      console.log(('Error DELETING', error));
    };
  };

  function* addItemSaga() {
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('DELETE_YOUR_ITEM', deleteYourItem);
  };

  export default addItemSaga;