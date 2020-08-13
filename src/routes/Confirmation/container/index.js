import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import ConfirmationComponents from '../components';
import phoneValidationAction, { userSignupAnonymousAction } from '../modules/actions';
import { fetchSignupInit } from '../../Signup/modules/actions';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.confirmation,
    signupData: state.signup,
    validationData: state.validation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    onValidate: bindActionCreators(phoneValidationAction, dispatch),
    onSignupAnonymous: bindActionCreators(userSignupAnonymousAction, dispatch),
    initSignup: bindActionCreators(fetchSignupInit, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationComponents));
