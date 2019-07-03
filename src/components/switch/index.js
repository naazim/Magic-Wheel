import React, {useState} from 'react';
import clsx from 'clsx';

const Switch = () => {
  const [active, toggleActive] = useState('de');

  return (
    <div className="mw-switch">
      <button className={clsx('mw-switch__btn', 'mw-switch__btn-de', active === 'de' && 'mw-switch__btn--active')}
              type="button" onClick={() => toggleActive(() => 'de')}>DE
      </button>
      <button className={clsx('mw-switch__btn', 'mw-switch__btn-en', active === 'en' && 'mw-switch__btn--active')}
              type="button" onClick={() => toggleActive(() => 'en')}>EN
      </button>
    </div>
  );
};

export default Switch;
