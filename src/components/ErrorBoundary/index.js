import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createLog } from './modules/actions';

import './styles.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, loading: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      loading: true,
    }, () => {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);

      if (window.location.hostname === 'localhost') {
        console.error('<----- ERROR ---->');
        console.error(error ? error.toString() : '');
        console.error(errorInfo.componentStack);
      } else {
        createLog({
          sysURL: window.location.origin,
          currentPath: window.location.href,
          navigator: window.navigator.userAgent,
          error: error ? error.toString() : '',
          errorInfo: errorInfo.componentStack,
        });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { hasError, loading } = this.state;

    if (hasError) {
      return (
        <div className='ErrorBoundary'>
          <div className={`${loading ? 'loading' : ''}`}>
            <h2>
              {'Ha ocurrido algo inesperado, te pedimos disculpas, estamos trabajando para resolverlo.'}
            </h2>
            <h2>
              <a href='/' className='go-back-link'>
                {'Volver'}
              </a>
            </h2>
            <div>
              <img src='/assets/images/undraw_doctor_kw5l1.svg' alt='' />
            </div>
          </div>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
