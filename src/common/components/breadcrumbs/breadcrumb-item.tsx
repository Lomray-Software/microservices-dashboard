import type { FC } from 'react';
import React from 'react';
import styles from '@components/breadcrumbs/styles.module.scss';
import Link from '@components/link';

export interface IBreadcrumbItem {
  to: string;
  title: string;
}

const BreadcrumbItem: FC<IBreadcrumbItem> = ({ to, title }) => (
  <li>
    <Link className={styles.link} to={to} href={to}>
      {title}
    </Link>
  </li>
);

export default BreadcrumbItem;
