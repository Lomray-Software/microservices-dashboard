import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

interface IFields {
  data: { label: string; value: string }[];
}

const EntityFields: FC<IFields> = ({ data }) => (
  <div className={styles.column}>
    {data.map(({ label, value }) => (
      <div key={String(label)} className={styles.columnInfo}>
        <span className={styles.description}>{label}</span>
        <span className={styles.info}>{value}</span>
      </div>
    ))}
  </div>
);

export default EntityFields;
