import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },  
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

// if (isAntDesignProPreview) {
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
//   plugins.push([
//     'umi-plugin-pro',
//     {
//       serverUrl: 'https://ant-design-pro.netlify.com',
//     },
//   ]);
// }

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  // history: 'hash',
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            // {
            //   path: '/user',
            //   redirect: '/user/login',
            // },
            {
              path: '/user/login',
              component: './user/login',
            },
            {
              path: '/user/retrieveByMobile',
              component: './user/retrieveByMobile',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              Routes: ['src/pages/Authorized'],
              authority: ['admin', 'user'],
              path: '/'
            },
            {
              path: 'account/settings',
              name: 'dashboard',
              Routes: ['src/pages/Authorized'],
              authority: ['admin','user'],
              icon: 'user',
              component: './account/settings',
              routes: [],
            },
            {
              path: '/costCenter',
              icon: 'form',
              name: 'form',
              // Routes: ['src/pages/Authorized'],
              authority: ['user'],
              routes: [
                {
                  path: '/costCenter/recharge',
                  name: 'recharge',
                  icon: 'form',
                  component: './costCenter/recharge'
                },
                {
                  path: '/costCenter/rechargeLog',
                  name: 'rechargeLog',
                  icon: 'form',
                  component: './costCenter/rechargeLog'
                },
                {
                  path: '/costCenter/bill',
                  name: 'bill',
                  icon: 'form',
                  component: './costCenter/bill'
                }
              ],
            },
            {
              path: '/message/settings',
              name: 'message',
              icon: 'message',
              // Routes: ['src/pages/Authorized'],
              authority: ['user'],
              routes: [
                {
                  path: '/message/settings/template',
                  component: './message/settings/template',
                  name: 'template',
                  icon: 'profile'
                }
              ],
            },
            // {
            //   name: '短信发送',
            //   icon: 'check-circle-o',
            //   path: '/message/sending',
            //   routes: [
            //     {
            //       path: '/message/sending/group',
            //       name: '短信群发',
            //       icon: 'profile',
            //       component: './message/seding/group'
            //     },
            //     {
            //       path: '/message/sending/p2p',
            //       name: '点对点短信',
            //       icon: 'profile',
            //       component: './message/seding/p2p'
            //     }
            //   ],
            // },
            {
              name: 'report',
              icon: 'rise',
              path: '/report',
              // Routes: ['src/pages/Authorized'],
              authority: ['user'],
              routes: [
                {
                  path: '/report/transmittance',
                  name: 'transmittance',
                  icon: 'pie-chart',
                  component: './report/transmittance'
                },
                {
                  path: '/report/interceptRecords',
                  name: 'sendingRecords',
                  icon: 'unordered-list',
                  component: './report/interceptRecords'
                },
                {
                  path: '/report/sendingRecords',
                  name: 'interceptRecords',
                  icon: 'unordered-list',
                  component: './report/sendingRecords'
                },
                {
                  path: '/report/receiveRecords',
                  name: 'receiveRecords',
                  icon: 'unordered-list',
                  component: './report/receiveRecords'
                }
              ],
            },
            {
              name: 'news',
              icon: 'read',
              path: '/news',
              // Routes: ['src/pages/Authorized'],
              authority: ['admin'],
              routes: [
                {
                  path: '/news/list',
                  name: 'publish',
                  icon: 'edit',
                  component: './news'
                },
              ],
            },
            {
              name: 'users',
              icon: 'user',
              path: '/users',
              // Routes: ['src/pages/Authorized'],
              authority: ['admin'],
              routes: [
                {
                  path: '/users/list',
                  name: 'list',
                  icon: 'user',
                  component: './users'
                },
              ],
            },
            {
              path: '/',
              redirect: '/account/settings'
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8080/webApi',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
