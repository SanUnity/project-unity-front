/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/UI/Checkbox';
import Button from 'components/UI/Button';
import FullTerms from './FullTerms';

class Terms extends Component {
  state = {
    cbAgree: false,
    handleShowFullTerms: false,
  };

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({ cbAgree: checked });
  };

  render() {
    const {
      onClose, onContinue, showAcceptTerms, literals,
    } = this.props;
    const { cbAgree, handleShowFullTerms } = this.state;
    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text terms-and-conditions'>
          <img src='/assets/images/green-arrow.svg' onClick={onClose} alt='' />
          <div className='terms-and-conditions-wrapper'>
            <br />
            <div className='c1'>
              <p className='c11'>
                <span className='c12 c8'>PRIVACY TERMS</span>
              </p>
              <p className='c2'>
                <span className='c8 c12' />
              </p>
              <p className='c3'>
                <span className='c4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed libero quis leo consequat consectetur. Suspendisse ullamcorper sapien ut lectus auctor auctor.</span>
              </p>
              <p className='c3'>
                <span className='c4'>Sed ornare enim arcu, elementum iaculis leo tincidunt in. Donec id erat neque. Phasellus rhoncus, ante sit amet auctor accumsan, mauris urna maximus neque, id pulvinar libero tortor a ante. Phasellus blandit auctor porta. Aenean vitae feugiat tellus, interdum malesuada metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur porttitor orci justo. Morbi vehicula, urna in dapibus efficitur, magna elit consectetur elit, vitae consequat dolor erat at tellus.</span>
              </p>
              <p className='c3'>
                <span className='c7 c8'>Vivamus tortor quam, porta vitae diam nec, eleifend consequat elit:</span>
              </p>
              <ul className='c5 lst-kix_list_1-0 start'>
                <li className='c10'><span className='c0'>Nulla vel metus iaculis, laoreet felis vel, placerat magna. Nam aliquam leo non iaculis maximus. Morbi odio orci, scelerisque sit amet sapien vitae, pulvinar congue orci.</span></li>
                <li className='c3 c13'><span className='c0'>Fusce ultrices magna ut nibh condimentum, vitae fermentum tortor rutrum. Nunc a ante efficitur, commodo erat in, varius augue. Pellentesque fermentum metus eu sapien interdum ultrices. Aenean tincidunt quam quis erat dapibus placerat in a nibh.</span></li>
              </ul>
              <p className='c3'>
                <span className='c7 c8'>In id leo mi. Sed dictum dui quis neque facilisis, nec aliquam orci congue
                  <a className='privacy-link' onClick={() => this.setState({ handleShowFullTerms: true })}>
                    click here
                  </a>
                </span>
              </p>
            </div>
            {showAcceptTerms && (
              <div className='accept-terms-wrapper'>
                <div className='form-group form-check'>
                  <Checkbox
                    className='form-group'
                    label={literals.acceptTerms}
                    name='remember'
                    onChange={this.handleCheckboxChange}
                  />
                </div>
                <div className='btn-mar-log text-center'>
                  <Button
                    label={literals.continueAsAnonimous}
                    onClick={onContinue}
                    disabled={!cbAgree}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {handleShowFullTerms ? (<FullTerms onClose={() => this.setState({ handleShowFullTerms: false })} />) : null}
      </React.Fragment>
    );
  }
}
Terms.displayName = 'Terms';
Terms.propTypes = {
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func,
  showAcceptTerms: PropTypes.bool,
  literals: PropTypes.object,
};

Terms.defaultProps = {
  onContinue: () => {},
  showAcceptTerms: false,
  literals: {},
};

export default Terms;
