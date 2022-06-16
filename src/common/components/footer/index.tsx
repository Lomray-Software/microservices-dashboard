import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

const Footer: FC = () => {
  const { t } = useTranslation('translation');
  const year = new Date().getFullYear();

  return (
    <footer className={combineCss('container', styles.footer)}>
      <ul className={styles.wrapper}>
        <li>
          © {year} {t('allRights')}
        </li>
        <li>
          {t('developed')}{' '}
          <a target="_blank" href="https://lomray.com/">
            Lomray Software
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
