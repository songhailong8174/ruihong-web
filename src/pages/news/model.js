import { addNews, newsList, modifyNews, publishNews, deleteNews, unPublish } from './service';

const Model = {
  namespace: 'News',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *add({ payload }, { call }) {
      return yield call(addNews, payload);
    },
    *modify({ payload }, { call }) {
      return yield call(modifyNews, payload);
    },
    *publish({ payload }, { call }) {
      return yield call(publishNews, payload);
    },
    *unPublish({ payload }, { call }) {
      return yield call(unPublish, payload);
    },
    *delete({ payload }, { call }) {
      return yield call(deleteNews, payload);
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(newsList, payload);
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
