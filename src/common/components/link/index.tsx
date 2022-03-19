import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkProps, Link as DefaultLink } from 'react-router-dom';
import { DEFAULT_APP_LANGUAGE } from '@constants/index';
import { getLngCode } from '@services/localization';

/**
 * Extends react router dom Link component
 * - remove trailing slash if current language not default on home link (e.g. /) (investigation)
 * - SSR return link with lang code
 * @constructor
 */
const Link: FC<LinkProps & { isLocalized?: boolean }> = (props) => {
  const { isLocalized = true, ...linkProps } = props;
  const { to, children, ...other } = linkProps;
  const { i18n } = useTranslation();

  const lng = getLngCode(i18n);
  const isNotDefaultLang = useMemo(() => lng !== DEFAULT_APP_LANGUAGE, [lng]);

  if (isLocalized && isNotDefaultLang && typeof to === 'string') {
    return (
      <DefaultLink
        to={`/${lng}${to.startsWith('/') ? to : `/${to}`}`.replace(/\/+$/, '')}
        {...other}>
        {children}
      </DefaultLink>
    );
  }

  return <DefaultLink {...linkProps} />;
};

export default Link;
