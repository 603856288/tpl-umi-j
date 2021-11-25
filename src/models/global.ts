import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { ConnectState } from './connect.d';
import basicMenu from '../utils/menu/basicMenu';

export interface GlobalModelState {
  collapsed: boolean;
  menu: any[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    menu: basicMenu,
  },

  effects: {},

  reducers: {
    setMenu(state, { payload }) {
      return {
        ...state,
        menu: payload
      };
    },
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    }
  }
};

export default GlobalModel;
