/**
 * api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import router from 'umi/router';

declare const window: {
  DEPLOY_ENV: string;
  location: {
    href: string;
    origin: string;
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const DEPLOY_ENV = window.DEPLOY_ENV === '##env##' ? 'test' : window.DEPLOY_ENV;

interface Datatype {
  portModule?: string;
  [propName: string]: any;
}
export interface Options {
  url: string;
  method: string;
  headers: any;
  data?: string | Datatype;
  body?: BodyInit;
  credentials?: RequestCredentials;
  requestType?: 'form' | 'json';
}

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  console.log(response, error, 'request-error');
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    // 主动取消的请求不需要提示网络异常
  } else if (!response && response !== null && error.toString() !== 'Cancel') {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  credentials: 'include',
});

request.use(async ({ req }, next) => {
  const { url, options } = req;
  const { headers, requestType } = options as Options;
  const env = window.DEPLOY_ENV || 'test';

  req.options.headers = { ...headers };
  req.options.requestType = requestType || 'json';
  await next();
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if (data.code !== '200' && !data.success) {
    if (data.returnMsg) {
      message.error(data.returnMsg);
    }
    return data;
  }
  return data;
});

export default request;
