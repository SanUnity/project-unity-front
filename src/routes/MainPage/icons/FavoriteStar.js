import React from 'react';

// eslint-disable-next-line react/prop-types
export default ({ className = '' }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5.38545 20.2058C5.20656 20.779 5.39369 21.3796 5.86121 21.7349C6.09498 21.9115 6.36277 21.9997 6.63 21.9997C6.89834 21.9997 7.16612 21.9115 7.39934 21.7338L12 18.2435L16.6001 21.7338C17.0671 22.088 17.6707 22.0891 18.1388 21.7349C18.6063 21.3796 18.7934 20.779 18.6145 20.2058L16.8575 14.5583L21.4581 11.0657C21.9251 10.7115 22.1117 10.112 21.9333 9.53772C21.755 8.9646 21.2661 8.59321 20.6888 8.59321H15.0022L13.2451 2.94565C13.0662 2.37138 12.5778 2 12 2C11.4222 2 10.9338 2.37138 10.7549 2.94565L8.99783 8.59321H3.31121C2.73393 8.59321 2.245 8.9646 2.06666 9.53772C1.88832 10.112 2.07489 10.7115 2.54187 11.0657L7.14253 14.5583L5.38545 20.2058Z'
    />
  </svg>
);
