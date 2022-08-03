import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { search } = useLocation();

  const [active, setActive] = useState<string | undefined>(
    new URLSearchParams(search).get('tab') || Object.keys(tabs)[0],
  );

  /**
   * Active component for current tab
   */
  const { Component } = tabs?.[active || ''] ?? tabs[Object.keys(tabs)[0]];

  /**
   * Select tab
   */
  const onSetActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const activeTab = e.currentTarget.dataset.id;
    const query = activeTab && `?tab=${activeTab}`;

    setActive(activeTab || Object.keys(tabs)[0]);
    navigate({ search: query }, { state: { silent: true }, replace: true });
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
