import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import type { LoadingBarRef } from 'react-top-loading-bar';
import LoadingBarComponent from 'react-top-loading-bar';
import PageLoading from '@services/page-loading';

const LoadingBar: FC = () => {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => PageLoading.setLoadingBarRef(ref), []);

  return <LoadingBarComponent color="#8f5fe8" ref={ref} />;
};

export default LoadingBar;
