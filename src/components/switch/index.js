import React, {useState} from 'react';
import clsx from 'clsx';
import i18n from '../i18n';


const Switch = () => {
  const [active, toggleActive] = useState('en');

  const toggleLanguage = (language) => {
    toggleActive(language);
    i18n.changeLanguage(language)
  };

  return (
    <div className="mw-switch">
      <button className={clsx('mw-switch__btn', 'mw-switch__btn-de', active === 'de' && 'mw-switch__btn--active')}
              type="button" onClick={() => toggleLanguage('de')}>DE
      </button>
      <button className={clsx('mw-switch__btn', 'mw-switch__btn-en', active === 'en' && 'mw-switch__btn--active')}
              type="button" onClick={() => toggleLanguage('en')}>EN
      </button>
    </div>
  );
};

export default Switch;
