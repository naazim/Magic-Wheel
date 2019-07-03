import React from 'react';
import clsx from 'clsx';

const Button = ({children, className, onClick, disabled}) => {
  return (
    <button className={clsx("mw-btn", className)} onClick={onClick} disabled={disabled}>{children}</button>
  );
};

export default Button;
