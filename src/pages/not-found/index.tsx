import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import StatusGate from '@components/status-gate';

/**
 * Not found page
 * @constructor
 */
const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <StatusGate code={404}>
      <span>404</span>
      <h2>{t('notFound404')}</h2>
    </StatusGate>
  );
};

export default NotFound;
