import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha, register, checkUserName } from './service';
import { queryCurrent } from '../../account/settings/service';
import { getPageQuery, setAuthority } from './utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'userLogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      
      yield put({
        type: 'changeLoginStatus',
        payload: response.result,
      }); // Login successfully

      if (response.code === 200) {
        sessionStorage.setItem('u-r', response.result.role);
        sessionStorage.setItem('x-auth-token', response.result.token);
        const currentUser = yield call(queryCurrent, payload);
        if (currentUser.code === 200) {
          sessionStorage.setItem('auth', currentUser.result.authstatus || 0);
          yield put(routerRedux.replace('/account/settings'));
        }
      } else {
        message.error(response.msg);
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *checkName({ payload }, { call }) {
      return yield call(checkUserName, payload)
    },
    *register({ payload }, { call }) {
      return yield call( register, payload);
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      return { ...state, status: payload.status, type: payload.role };
    },
  },
};
export default Model;
