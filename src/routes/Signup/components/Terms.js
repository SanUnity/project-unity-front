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
                <span className='c12 c8'>AVISO DE PRIVACIDAD SIMPLIFICADO DE LA APLICACI&Oacute;N M&Oacute;VIL COVID-19MX</span>
              </p>
              <p className='c2'>
                <span className='c8 c12' />
              </p>
              <p className='c3'>
                <span className='c4'>Los datos recabados pueden ser utilizados para establecer contacto con los ciudadanos.</span>
              </p>
              <p className='c3'>
                <span className='c4'>La Secretar&iacute;a de Salud, a trav&eacute;s de la Subsecretaria de Prevenci&oacute;n y Promoci&oacute;n de la Salud,</span><span className='c7'>&nbsp;es la responsable del tratamiento de los datos personales y sensibles que se recolectan a trav&eacute;s de </span><span className='c0'>aplicaci&oacute;n m&oacute;vil COVID-19MX. </span>
              </p>
              <p className='c3'>
                <span className='c7 c8'>Sus datos personales ser&aacute;n utilizados con las siguientes finalidades:</span>
              </p>
              <ul className='c5 lst-kix_list_1-0 start'>
                <li className='c10'><span className='c0'>Brindar orientaci&oacute;n m&eacute;dica a las personas que proporcionaron sus datos para ser contactadas y en su caso atender la situaci&oacute;n de emergencia que potencialmente pueda ocasionarse. </span></li>
                <li className='c3 c13'><span className='c0'>Estad&iacute;sticos necesarios para que las autoridades sanitarias y epidemiol&oacute;gicas dirijan acciones pertinentes a la enfermedad COVID-19.</span></li>
              </ul>
              <p className='c3'>
                <span className='c7 c8'>Si desea conocer nuestro aviso de privacidad integral, haz click
                  <a className='privacy-link' onClick={() => this.setState({ handleShowFullTerms: true })}>
                    aquí
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
