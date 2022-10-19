import PageLoading from '@lomray/client-helpers-react/services/page-loading';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import type { LoadingBarRef } from 'react-top-loading-bar';
import LoadingBarComponent from 'react-top-loading-bar';

const LoadingBar: FC = () => {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => PageLoading.setLoadingBarRef(ref), []);

  return <LoadingBarComponent color="#8f5fe8" ref={ref} />;
};

export default LoadingBar;
