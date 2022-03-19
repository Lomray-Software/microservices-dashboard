import React, { FC, useEffect, useRef } from 'react';
import type { LoadingBarRef } from 'react-top-loading-bar';
import LoadingBarComponent from 'react-top-loading-bar';
import PageLoading from '@services/page-loading';

const LoadingBar: FC = () => {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => PageLoading.setLoadingBarRef(ref), []);

  return <LoadingBarComponent color="#f11946" ref={ref} />;
};

export default LoadingBar;
