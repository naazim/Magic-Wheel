import React from 'react';
import i18next from 'i18next';
import {colors} from '../chart';

const Legend = () => {
  const colorText = i18next.t('colorStatus', {returnObjects: true});
  return (
    <div className="mw-legend">
      { colors.map((color, i) => <span key={i} className="mw-legend__color" style={{'--bgcolor': color}} >{colorText[i]}  </span>) }
    </div>
  );
};

export default Legend;
