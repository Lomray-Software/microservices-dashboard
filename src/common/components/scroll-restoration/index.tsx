import ScrollRestorationService from '@lomray/client-helpers/services/scroll-restoration';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration: FC = () => {
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => ScrollRestorationService.addListeners(pathname), []);
  useEffect(() => ScrollRestorationService.handleNavigate(pathname), [pathname]);

  return null;
};

export default ScrollRestoration;
