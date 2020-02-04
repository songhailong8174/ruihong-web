import { query } from './service';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
const Model = {
  namespace: 'AccountInfo',
  state: {
    data: {
      banlance: 0
    },
    isLoading: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      let banlance = 0;
      if (response.code != 200) {
        banlance = 0;
        // message.error('获取账户余额失败')
      } else {
        banlance = response.result;
      }
      yield put({
        type: 'saveBalance',
        payload: {banlance: banlance},
      });
    }
  },
  reducers: {
    saveBalance(state, action) {
      // console.log(state, action);
      return { ...state, data: action.payload };
    },

    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
