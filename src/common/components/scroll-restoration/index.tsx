import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ScrollRestorationService from '@services/scroll-restoration';

const ScrollRestoration: FC = () => {
  const history = useHistory();

  useEffect(() => ScrollRestorationService.addListeners(history), [history]);

  return null;
};

export default ScrollRestoration;
