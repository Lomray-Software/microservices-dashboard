import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

const Spinner: FC = () => <div className={styles.ring} />;

export default Spinner;
