import type { FC } from 'react';
import React from 'react';
import type { IField } from '@components/forms/fields';
import i18n from '@services/localization';
import EntityFields from './entity-fields';
import styles from './styles.module.scss';

interface IData {
  fields: IField[];
  entity?: Record<string, any> | null;
}

interface IOverview {
  data: IData[];
  title: string;
}

/**
 * Print entity fields
 */
const Overview: FC<IOverview> = ({ data, title }) => (
  <>
    <h3 className={styles.title}>{title}</h3>
    {data.map(({ entity, fields }, i) => {
      const result = fields.map(({ name, title: label }) => ({
        value: entity?.[name],
        label: i18n.t(label),
      }));

      return <EntityFields key={result[i].label} data={result} />;
    })}
  </>
);

export default Overview;
