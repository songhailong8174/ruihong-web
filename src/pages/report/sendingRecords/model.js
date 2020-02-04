import { queryNearSending } from './service';

const Model = {
  namespace: 'NearHistory',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryNearSending, payload);
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
