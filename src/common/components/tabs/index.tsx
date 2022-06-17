import * as queryString from 'querystring';
import type { ReactElement } from 'react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import combineCss from '@helpers/combine-css';
import type { SSRComponent } from '@interfaces/ssr-component';
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

const Tabs: SSRComponent<ITabs> = ({ tabs, children }) => {
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
      <ul className={styles.head}>
        {Object.keys(tabs).map((tab) => (
          <li
            key={tab}
            className={combineCss(styles.headItem, active === tab ? styles.selected : '')}>
            <button type="button" onClick={onSetActiveItem.bind(null, tab)}>
              {tabs[tab].title}
            </button>
          </li>
        ))}
      </ul>
      {children}
      <article>{Component}</article>
    </section>
  );
};

export default Tabs;
