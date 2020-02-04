import { usersList, appove } from './service';

const Model = {
  namespace: 'Users',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *appove({ payload }, { call }) {
      return yield call(appove, payload);
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(usersList, payload);
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
