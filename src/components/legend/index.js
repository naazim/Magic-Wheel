import React from 'react';
import {colors} from '../chart';

const colorText = {
  en: [ 'Agree', 'Neutral', 'Disagree' ]
};

const Legend = () => {
  return (
    <div className="mw-legend">
      { colors.map((color, i) => <span key={i} className="mw-legend__color" style={{'--bgcolor': color}} >{colorText.en[i]}</span>) }
    </div>
  );
};

export default Legend;
