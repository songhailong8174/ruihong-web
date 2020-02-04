import { queryBill } from './service';

const Model = {
  namespace: 'Bill',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBill, payload);
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
