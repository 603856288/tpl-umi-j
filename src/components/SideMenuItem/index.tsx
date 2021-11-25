import React from 'react';
import IconFont from '../IconFont';

interface Props {
  icon?: string;
  title?: string;
}

const iconStyle: React.CSSProperties = {
  fontSize: '20px',
  position: 'relative',
  top: '2px',
};

export default ({ title, icon }: Props) => {
  return (
    <div>
      {icon && <IconFont type={icon} style={iconStyle} />}
      <span>{title}</span>
    </div>
  );
};
