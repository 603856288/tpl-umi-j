// type ENV_MODEL = 'test' | 'uat';
const DEPLOY_ENV: string = process.env.DEPLOY_ENV;
let ENV = '';
switch (DEPLOY_ENV) {
  case 'test': ENV = '-test'; break;
  case 'uat': ENV = '-uat'; break;
  case 'online': ENV = ''; break;
  default: ENV = '-test';
}
export default {
  '/api': {
    target: `https://***${ENV}***/`,
    changeOrigin: true,
    pathRewrite: { '^/server': '' },
  },
  '/oss': {
    target: '******',
    changeOrigin: true,
    pathRewrite: { '^/oss': '' },
    secure: false,
  },
};
