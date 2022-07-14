import type { FC } from 'react';
import React from 'react';
import Link from '@components/link';
import styles from './styles.module.scss';

export interface IBreadcrumbItem {
  to: string;
  title: string;
}

const BreadcrumbItem: FC<IBreadcrumbItem> = ({ to, title }) => (
  <li>
    <Link className={styles.link} to={to}>
      {title}
    </Link>
  </li>
);

export default BreadcrumbItem;
