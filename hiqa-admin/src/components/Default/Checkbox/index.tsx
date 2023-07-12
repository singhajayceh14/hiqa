import React from 'react';

import styles from '@/styles/Components/Default/Checkbox.module.scss';

interface PROPS {
  name: string;
  label?: string | JSX.Element;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function index(props: PROPS) {
  return (
    <div>
      <label className={styles['checkbox-button']}>
        <input
          type="checkbox"
          className={styles['checkbox-button__input']}
          id={Math.random() * 1000 + 'Checkox'}
          name={props.name}
          checked={props?.checked}
          onChange={props.onChange}
        />
        <span className={styles['checkbox-button__control']}></span>
        {props?.label && <span className={styles['checkbox-button__label']}>{props.label}</span>}
      </label>
    </div>
  );
}

export default index;
