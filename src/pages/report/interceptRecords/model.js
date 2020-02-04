import { querySendingHistory } from './service';

const Model = {
  namespace: 'SendingHistory',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySendingHistory, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
