import { queryCity, queryCurrent, queryProvince, query as queryUsers, modifyInfo, modifyPassword, getCaptcha, modifyMobile, authUser } from './service';
import { routerRedux } from 'dva/router';
const Model = {
  namespace: 'accountSettings',
  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
  },
  effects: {
    *authUser({ payload }, { call }) {
      return yield call(authUser, payload);
    },
    *getCaptcha({ payload }, { call }) {
      return yield call(getCaptcha, payload);
    },
    *modifyInfo({ payload }, { call }) {
      return yield call(modifyInfo, payload);
    },
    *modifyMobile({ payload }, { call }) {
      return yield call(modifyMobile, payload);
    },
    *modifyPassword({ payload }, { call }) {
      return yield call(modifyPassword, payload);
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
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

    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
    },

    *fetchCity({ payload }, { call, put }) {
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      sessionStorage.setItem('auth', action.payload.authstatus);
      // console.log(state, action.payload);
      return { ...state, currentUser: action.payload || {} };
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

    setProvince(state, action) {
      return { ...state, province: action.payload };
    },

    setCity(state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
