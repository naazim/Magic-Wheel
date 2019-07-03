import React from 'react';
import clsx from 'clsx';

const Button = ({ children, className }) => {
  return (
    <button className={clsx("mw-btn", className)}>{children}</button>
  );
};

export default Button;
