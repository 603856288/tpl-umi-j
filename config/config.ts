import routes from './routes/index';
import { defineConfig, utils } from 'umi';
import proxy from './proxy';

const path = require('path');

const { winPath } = utils;
// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

console.log(`process.env.DEPLOY_ENV-${process.env.DEPLOY_ENV}`);

export default defineConfig({
  mfsu: {},
  fastRefresh: {},
  webpack5: {},
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  exportStatic: {},
  antd: {},
  dva: {
    hmr: true,
    immer: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  routes,
  base: '/',
  hash: true,
  targets: {
    ie: 11,
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // antd主题
    'primary-color': '#00BC70',
    // 其他颜色：pre-gray-最浅灰，light-gray-浅灰，deep-gray-深灰
    'pre-gray': '#F2F2F2',
    'light-gray': '#d9d9d9',
    'mid-gray': '#909090',
    'deep-gray': '#1A202D',
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    'process.env.DEPLOY_ENV': process.env.DEPLOY_ENV,
  },
  ignoreMomentLocale: true,
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules')
          || context.resourcePath.includes('ant.design.pro.less')
          || context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@less': path.resolve(__dirname, 'src/less'),
    '@@/*': path.resolve(__dirname, 'src/.umi/*'),
    utils: path.resolve(__dirname, '../utils'),
  },
  proxy,
});
