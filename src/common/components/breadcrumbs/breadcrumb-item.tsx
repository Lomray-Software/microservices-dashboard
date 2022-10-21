import Link from '@lomray/afterjs-helpers/components/link';
import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

export interface IBreadcrumbItem {
  title: string;
  to?: string;
}

const BreadcrumbItem: FC<IBreadcrumbItem> = ({ to, title }) => (
  <li>
    {to ? (
      <Link className={styles.link} to={to}>
        {title}
      </Link>
    ) : (
      <span className={styles.link}>{title}</span>
    )}
  </li>
);

export default BreadcrumbItem;
