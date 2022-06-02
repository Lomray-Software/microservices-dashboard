import type { FC } from 'react';
import React from 'react';
import type { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import Link from '@components/link';
import ROUTES from '@constants/routes';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

const Breadcrumbs: FC<RouteComponentProps> = ({ history, location: { pathname } }) => {
  const pathNames = pathname.split('/').filter((el) => el);

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={ROUTES.HOME} onClick={() => history.push('/')}>
        Home
      </Link>
      {pathNames.map((elem, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;

        return index === pathNames.length - 1 ? (
          <p key={`${routeTo}-${elem}`} className={combineCss(styles.link, styles.last)}>
            <span className={styles.separator}>/</span>
            {elem}
          </p>
        ) : (
          <Link
            className={styles.link}
            to={routeTo}
            key={`${routeTo}-${elem}`}
            onClick={() => history.push(routeTo)}>
            <span className={styles.separator}>/</span>
            {elem}
          </Link>
        );
      })}
    </div>
  );
};

export default withRouter(Breadcrumbs);
