import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

interface IEntityFields {
  data: { label: string; value?: string }[];
}

const EntityFields: FC<IEntityFields> = ({ data }) => (
  <div className={styles.column}>
    {data.map(({ label, value }) => (
      <div key={label} className={styles.columnInfo}>
        <span className={styles.description}>{label}</span>
        <span className={styles.info}>{value}</span>
      </div>
    ))}
  </div>
);

export default EntityFields;
