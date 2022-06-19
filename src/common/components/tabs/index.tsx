import * as queryString from 'querystring';
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
  const { pathname, search } = useLocation();

  const name = new URLSearchParams(search).get('tab');
  const active = name || Object.keys(tabs)[0];

  const { Component } = tabs[active];

  const onSetActiveItem = (tab: string) => {
    const query = queryString.stringify({ tab });

    history.push({ pathname, search: query });
  };

  return (
    <section className={styles.body}>
      <div className={styles.tabs}>
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={combineCss(styles.tab, active === tab ? styles.selected : '')}
            type="button"
            onClick={onSetActiveItem.bind(null, tab)}>
            {tabs[tab].title}
          </button>
        ))}
      </div>
      {Component}
    </section>
  );
};

export default Tabs;
