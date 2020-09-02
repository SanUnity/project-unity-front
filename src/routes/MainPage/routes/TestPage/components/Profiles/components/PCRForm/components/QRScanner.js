import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-scanner';

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: '',

    };
  }

  componentDidUpdate({ retry: prevRetry }) {
    const { retry } = this.props;

    if (retry !== prevRetry) {
      this.clearResult();
    }
  }

  clearResult = () => {
    this.setState({
      result: '',
    });
  }

  handleScan = (data) => {
    const { result } = this.state;
    if (!result) {
      this.setState({
        result: data,
      });
    }
  }

  handleError = (err) => {
    console.error(err);
  }

  handleContinue = () => {
    const { onQRReaded } = this.props;
    const { result } = this.state;

    if (!result) return;

    onQRReaded(result);
  }

  render() {
    const previewStyle = {
      height: 'auto',
      maxHeight: 320,
      width: '100%',
    };

    const { literals } = this.props;
    const { delay, result } = this.state;

    return (
      <div className='qr-scanner-wrapper'>
        <h2>{literals.qrTitle}</h2>

        <QrReader
          className='qr-scanner-component'
          delay={delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode='rear'
        />

        <p>{literals.qrDescription}</p>

        <button type='button' className={!result ? 'disabled' : ''} onClick={this.handleContinue}>
          {literals.continue}
        </button>
      </div>
    );
  }
}
QRScanner.displayName = 'QRScanner';
QRScanner.propTypes = {
  literals: PropTypes.object.isRequired,
  onQRReaded: PropTypes.func.isRequired,
  retry: PropTypes.number,
};
QRScanner.defaultProps = {
  retry: 0,
};
export default QRScanner;
