import type { FC } from 'react';
import React from 'react';
import combineCss from '@helpers/combine-css';
import type { TABS } from '@pages/user';
import styles from './styles.module.scss';

interface ITabs {
  tabs: { title: string; id: string }[];
  activeTab: string;
  setActiveTab: (tab: TABS) => void;
}

const Tabs: FC<ITabs> = ({ tabs, activeTab, setActiveTab }) => (
  <div className={styles.tabs}>
    {tabs.map(({ id, title }) => (
      <button
        type="button"
        onClick={setActiveTab.bind(null, id)}
        key={id}
        className={combineCss(styles.tab, id === activeTab ? styles.active : '')}>
        {title}
      </button>
    ))}
  </div>
);

export default Tabs;
