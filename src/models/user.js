import { routerRedux } from 'dva/router';
import { queryCurrent, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if(response.code == -99){
        if (window.location.pathname !== '/user/login') {
          yield put(
            routerRedux.replace({
              pathname: '/user/login'
            }),
          );
        }
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response.result,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      sessionStorage.setItem('auth', action.payload.authstatus || 0);
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
