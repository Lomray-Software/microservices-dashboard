import type { FC } from 'react';
import React from 'react';
import type { IField } from '@components/forms/fields';
import i18n from '@services/localization';
import EntityFields from './entity-fields';
import styles from './styles.module.scss';

interface IData {
  fields: IField[];
  key: string;
  entity?: Record<string, any> | null;
}

interface IOverview {
  data: IData[];
  title: string;
}

/**
 * Print entity fields
 */
const Overview: FC<IOverview> = ({ data, title, children }) => (
  <>
    <h3 className={styles.title}>{title}</h3>
    <div className={React.isValidElement(children) ? styles.content : ''}>
      {children}
      <div className={styles.wrapper}>
        {data.map(({ entity, fields, key }) => {
          const result = fields.map(({ name, title: label }) => ({
            value: entity?.[name],
            label: i18n.t(label),
          }));

          return <EntityFields key={key} data={result} />;
        })}
      </div>
    </div>
  </>
);

export default Overview;
