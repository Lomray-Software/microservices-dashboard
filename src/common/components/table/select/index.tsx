import type { FC } from 'react';
import React from 'react';
import combineCss from '@helpers/combine-css';
import useToggle from '@hooks/use-toggle';
import styles from './styles.module.scss';

interface ISelect {
  pageSize: number;
  setPageSize: (value: number) => void;
}

const COUNT_ELEM = [10, 20, 30, 40, 50];

const Select: FC<ISelect> = ({ pageSize, setPageSize }) => {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <div role="presentation" className={styles.select} onClick={setIsOpen}>
      <span className={styles.value}>{pageSize}</span>
      <ul className={combineCss(styles.list, isOpen ? styles.active : '')}>
        {COUNT_ELEM.map((elem) => (
          <li
            role="presentation"
            key={elem}
            className={styles.value}
            onClick={setPageSize.bind(null, elem)}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
