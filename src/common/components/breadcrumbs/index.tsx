import type { FC, ReactElement } from 'react';
import React, { useMemo } from 'react';
import type { IBreadcrumbItem } from '@components/breadcrumbs/breadcrumb-item';
import BreadcrumbItem from '@components/breadcrumbs/breadcrumb-item';
import styles from './styles.module.scss';

interface IBreadcrumbs {
  children:
    | ReactElement<IBreadcrumbItem, typeof BreadcrumbItem>[]
    | ReactElement<IBreadcrumbItem, typeof BreadcrumbItem>;
}

const Breadcrumbs: FC<IBreadcrumbs> & { Item: typeof BreadcrumbItem } = ({ children }) => {
  const items = useMemo(
    () =>
      React.Children.toArray(children).map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }

        return child;
      }),
    [children],
  );

  return <ul className={styles.list}>{items}</ul>;
};

Breadcrumbs.Item = BreadcrumbItem;

export default Breadcrumbs;
