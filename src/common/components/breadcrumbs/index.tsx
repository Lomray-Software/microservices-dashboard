import type { FC, ReactElement } from 'react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ROUTES from '@constants/routes';
import type { IBreadcrumbItem } from './breadcrumb-item';
import BreadcrumbItem from './breadcrumb-item';
import styles from './styles.module.scss';

interface IBreadcrumbs {
  children?:
    | ReactElement<IBreadcrumbItem, typeof BreadcrumbItem>[]
    | ReactElement<IBreadcrumbItem, typeof BreadcrumbItem>;
}

const Breadcrumbs: FC<IBreadcrumbs> & { Item: typeof BreadcrumbItem } = ({ children }) => {
  const { t } = useTranslation('menu');

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

  return (
    <ul className={styles.list}>
      <BreadcrumbItem to={ROUTES.HOME.URL} title={t('home')} />
      {items}
    </ul>
  );
};

Breadcrumbs.Item = BreadcrumbItem;

export default Breadcrumbs;
