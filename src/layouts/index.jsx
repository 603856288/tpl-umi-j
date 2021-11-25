import React from 'react';
import BasicLayout from './BasicLayout';

export default (props) => {
  const Comp = BasicLayout;

  if (Comp) {
    return <Comp {...props} />;
  }
  return <div>页面不存在...</div>;
};
