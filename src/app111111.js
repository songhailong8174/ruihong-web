import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
const app = dva({
  history: createHistory(),
  onError (error) {
    message.error(error.message);
  },
  // >>>>>>>>>>>>>>>>>>> add start >>>>>>>>>>>>>>>>>>>>>>>>
  onReducer: r => (state, action) => {
    alert(10);
    const newState = r(state, action);
    // 'app/logout' 为 models 目录文件中 effect 中的方法名
    if (action.payload && action.payload.actionType === 'login/logout') {
      return { app: newState.app, loading: newState.loading, routing: newState.routing };
    }
    return newState;
  },
  // >>>>>>>>>>>>>>>>>>> add end >>>>>>>>>>>>>>>>>>>>>>>>
});