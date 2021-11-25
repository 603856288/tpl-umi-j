import React from 'react';
import img from '@/assets/img/403.png';

const wrapStyle = {
  height: '80%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const imgStyle = {
  width: 200,
  height: 200,
  marginBottom: '24px',
};

const textStyle = {
  fontSize: '14px',
  fontFamily: 'PingFangSC-Regular,PingFang SC',
  color: 'rgba(97,97,97,1)',
  lineHeight: '20px',
};

export default () => {
  return (
    <div style={wrapStyle}>
      <div>
        <img src={img} style={imgStyle} />
        <div style={textStyle}>抱歉，你无权访问该页面</div>
      </div>
    </div>
  );
};
