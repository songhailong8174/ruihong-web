import { sedingCount } from './service';

const Model = {
  namespace: 'Report',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(sedingCount, payload);
      yield put({
        type: 'save',
        payload: {list: (response.result != null && response.result != undefined) ? response.result : [] },
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
