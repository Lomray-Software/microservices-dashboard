import React, { FC } from 'react';
import './styles.scss';

interface ILoader {
  isWhite?: boolean;
}

const Loader: FC<ILoader> = ({ isWhite }) => (
  <div id="cube-loader" className={isWhite ? 'white' : ''}>
    <div className="caption">
      <div className="cube-loader">
        <div className="cube loader-1" />
        <div className="cube loader-2" />
        <div className="cube loader-4" />
        <div className="cube loader-3" />
      </div>
    </div>
  </div>
);

export default Loader;
