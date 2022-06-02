import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface IFields {
  data: { label: string; value: string }[];
}

const Fields: FC<IFields> = ({ data }) => {
  const { t } = useTranslation('users-page');

  return (
    <div className={styles.column}>
      {data.map(({ label, value }) => (
        <div key={label} className={styles.columnInfo}>
          <span className={styles.description}>{t(label)}</span>
          <span className={styles.info}>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default Fields;
