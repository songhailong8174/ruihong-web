import { routerRedux } from 'dva/router';
import { getFakeCaptcha, findPass } from './service';
import { getPageQuery, setAuthority } from './utils/utils';

const Model = {
  namespace: 'findPass',
  state: {
    status: undefined,
  },
  effects: {
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *findPass({ payload }, { call, put }){
      const response = yield call(findPass, payload);
      if (response.code === 200) {
        const params = getPageQuery();
        let { redirect } = params;
        yield put(routerRedux.replace(redirect || '/user/login'));
      }
      
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
