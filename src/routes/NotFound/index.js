import React from 'react';
import { ROUTE_PATH } from '..';

export default () => (
  <div className='NotFound'>
    <div>
      <h1>404</h1>
      <div className='content'>
        <h2>This page could not be found.</h2>
      </div>
      <p>
        <a href={ROUTE_PATH.MAIN_PAGE}>Go home</a>
      </p>
    </div>
  </div>
);
