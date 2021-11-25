/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, { MenuDataItem, BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Result, Button, message } from 'antd';
import SideMenuItem from '@/components/SideMenuItem';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/img/logo.svg';

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    /* extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    } */
  />
);

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => menuList.map(item => {
  const localItem = {
    ...item,
    children: item.children ? menuDataRender(item.children) : [],
  };
  return Authorized.check(item.authority, localItem, null) as MenuDataItem;
});

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings, location = { pathname: '/' }, menu } = props;

  const [userName, setUserName] = useState();
  useEffect(() => {
    resetLayoutUI();
  }, []);

  const resetLayoutUI = () => {
    document.querySelector('.ant-pro-global-header')?.parentElement?.remove();
  };

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  return (
    <>
      <div className="main-header">
        <div>
          <img src={logo} alt="众安科技" style={{ width: 140, height: 26, marginLeft: 10 }} />
        </div>
      </div>
      <ProLayout
        logo={null}
        disableMobile
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        siderWidth={218}
        breakpoint={false}
        menuDataRender={() => menu}
        subMenuItemRender={menuItemProps => <SideMenuItem icon={menuItemProps.icon} title={menuItemProps.name} />}
        menuItemRender={(menuItemProps, defaultDom) => (
          <Link to={menuItemProps.path}>
            <SideMenuItem icon={menuItemProps.icon} title={menuItemProps.name} />
          </Link>
        )}
        itemRender={() => null}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings }) => ({
  settings,
  collapsed: global.collapsed,
  menu: global.menu,
}))(BasicLayout);
