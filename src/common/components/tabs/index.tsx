import type { FC, ReactElement } from 'react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

interface ITabs {
  tabs: Record<
    string,
    {
      Component: ReactElement;
      title: string;
    }
  >;
}

const Tabs: FC<ITabs> = ({ tabs }) => {
  const history = useHistory();
  const { search } = useLocation();

  const active = new URLSearchParams(search).get('tab') || Object.keys(tabs)[0];
  const { Component } = tabs?.[active] ?? tabs[Object.keys(tabs)[0]];

  /**
   * Select tab
   */
  const onSetActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const activeTab = e.currentTarget.dataset.id;
    const query = activeTab && `?tab=${activeTab}`;

    history.replace({ search: query, state: { silent: true } });
  };

  return (
    <section className={styles.body}>
      <div className={styles.tabs}>
        {Object.keys(tabs).map((tab, i) => (
          <button
            key={tab}
            data-id={i > 0 ? tab : ''}
            className={combineCss(styles.tab, active === tab ? styles.selected : '')}
            type="button"
            onClick={onSetActiveTab}>
            {tabs[tab].title}
          </button>
        ))}
      </div>
      {Component}
    </section>
  );
};

export default Tabs;
