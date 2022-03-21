import React from 'react';
import InitialProps from '@helpers/initial-props';
import { SSRComponent } from '@interfaces/ssr-component';
import stores, { StoreProps } from './index.props';

type Props = StoreProps;

const Home: SSRComponent<Props> = ({ page }) => (
  <div style={{ color: 'white' }}>
    Home page: {page.title}
    <button type="button" onClick={() => page.setTitle('YEEEAHH')}>
      Change
    </button>
  </div>
);

Home.getInitialProps = InitialProps(({ page }) => {
  page.setTitle('From server');
}, stores);

export default Home;
