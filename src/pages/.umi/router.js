import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/long/project/ant/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BlankLayout" */ '../../layouts/BlankLayout'),
          LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BlankLayout').default,
    Routes: [require('../Authorized').default],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
              LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/UserLayout').default,
        routes: [
          {
            path: '/user/login',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__user__login__model.js' */ '/Users/long/project/ant/src/pages/user/login/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__user__login" */ '../user/login'),
                  LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/login').default,
            exact: true,
          },
          {
            path: '/user/retrieveByMobile',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__user__retrieveByMobile__model.js' */ '/Users/long/project/ant/src/pages/user/retrieveByMobile/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__user__retrieveByMobile" */ '../user/retrieveByMobile'),
                  LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/retrieveByMobile').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        Routes: [require('../Authorized').default],
        authority: ['admin', 'user'],
        routes: [
          {
            Routes: [require('../Authorized').default],
            authority: ['admin', 'user'],
            path: '/',
            exact: true,
          },
          {
            path: '/account/settings',
            name: 'dashboard',
            Routes: [require('../Authorized').default],
            authority: ['admin', 'user'],
            icon: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__account__settings__model.js' */ '/Users/long/project/ant/src/pages/account/settings/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__account__settings" */ '../account/settings'),
                  LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../account/settings').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/costCenter',
            icon: 'form',
            name: 'form',
            authority: ['user'],
            routes: [
              {
                path: '/costCenter/recharge',
                name: 'recharge',
                icon: 'form',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__costCenter__recharge__model.js' */ '/Users/long/project/ant/src/pages/costCenter/recharge/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../costCenter/recharge'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../costCenter/recharge').default,
                exact: true,
              },
              {
                path: '/costCenter/rechargeLog',
                name: 'rechargeLog',
                icon: 'form',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__costCenter__rechargeLog__model.js' */ '/Users/long/project/ant/src/pages/costCenter/rechargeLog/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../costCenter/rechargeLog'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../costCenter/rechargeLog').default,
                exact: true,
              },
              {
                path: '/costCenter/bill',
                name: 'bill',
                icon: 'form',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__costCenter__bill__model.js' */ '/Users/long/project/ant/src/pages/costCenter/bill/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../costCenter/bill'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../costCenter/bill').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/message/settings',
            name: 'message',
            icon: 'message',
            authority: ['user'],
            routes: [
              {
                path: '/message/settings/template',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__message__settings__template__model.js' */ '/Users/long/project/ant/src/pages/message/settings/template/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../message/settings/template'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../message/settings/template').default,
                name: 'template',
                icon: 'profile',
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'report',
            icon: 'rise',
            path: '/report',
            authority: ['user'],
            routes: [
              {
                path: '/report/transmittance',
                name: 'transmittance',
                icon: 'pie-chart',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__report__transmittance__model.js' */ '/Users/long/project/ant/src/pages/report/transmittance/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../report/transmittance'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../report/transmittance').default,
                exact: true,
              },
              {
                path: '/report/sendingRecords',
                name: 'sendingRecords',
                icon: 'unordered-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__report__sendingRecords__model.js' */ '/Users/long/project/ant/src/pages/report/sendingRecords/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../report/sendingRecords'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../report/sendingRecords').default,
                exact: true,
              },
              {
                path: '/report/interceptRecords',
                name: 'interceptRecords',
                icon: 'unordered-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__report__interceptRecords__model.js' */ '/Users/long/project/ant/src/pages/report/interceptRecords/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../report/interceptRecords'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../report/interceptRecords').default,
                exact: true,
              },
              {
                path: '/report/receiveRecords',
                name: 'receiveRecords',
                icon: 'unordered-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__report__receiveRecords__model.js' */ '/Users/long/project/ant/src/pages/report/receiveRecords/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../report/receiveRecords'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../report/receiveRecords').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'news',
            icon: 'read',
            path: '/news',
            authority: ['admin'],
            routes: [
              {
                path: '/news/list',
                name: 'publish',
                icon: 'edit',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__news__model.js' */ '/Users/long/project/ant/src/pages/news/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../news'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../news').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'users',
            icon: 'user',
            path: '/users',
            authority: ['admin'],
            routes: [
              {
                path: '/users/list',
                name: 'list',
                icon: 'user',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__users__model.js' */ '/Users/long/project/ant/src/pages/users/model.js').then(
                          m => {
                            return { namespace: 'model', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../users'),
                      LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../users').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/',
            redirect: '/account/settings',
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/long/project/ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/long/project/ant/node_modules/_umi-build-dev@1.13.12@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
