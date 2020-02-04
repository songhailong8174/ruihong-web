import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { logout } from '@/services/user';
import { setAuthority } from '@/pages/user/login/utils/utils';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *logout(_, { call, put }) {
      const response = yield call(logout);
      if(response.code == 200){
        sessionStorage.removeItem('x-auth-token');
        sessionStorage.removeItem('u-r');
        const { redirect } = getPageQuery(); // redirect
        if (window.location.pathname !== '/user/login' && !redirect) {
          // console.log(routerRedux);
          yield put(
            routerRedux.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            }),
          );
        }
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
