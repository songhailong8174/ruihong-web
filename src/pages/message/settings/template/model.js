import { addTemplate, queryTemplates, removeTemplate } from './service';

const Model = {
  namespace: 'Template',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTemplates, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },

    *add({ payload }, { call }) {
      return yield call(addTemplate, payload);
    },

    *remove({ payload }, { call }) {
      return yield call(removeTemplate, payload);
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
