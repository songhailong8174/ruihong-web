import { routerRedux } from "dva/router";
import { getFakeCaptcha, register, getImgCode } from "./service";
import { queryCurrent } from "../../account/settings/service";
import { getPageQuery, setAuthority } from "./utils/utils";
import { message } from "antd";

const Model = {
  namespace: "userReg",
  state: {
    status: undefined
  },
  effects: {
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *getImgCode({ payload }, { call }) {
      return yield call(getImgCode, payload);
    },
    *register({ payload }, { call }) {
      return yield call(register, payload);
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      return { ...state, status: payload.status, type: payload.role };
    }
  }
};
export default Model;
