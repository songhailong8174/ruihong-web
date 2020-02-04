import { queryReceive } from './service';

const Model = {
  namespace: 'Receive',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReceive, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
