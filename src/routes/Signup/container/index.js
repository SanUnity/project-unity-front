import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import SignupComponents from '../components';
import fetchSignupAction from '../modules/actions';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.session.authenticated,
    literals: state.i18n.literals.signup,
    signupData: state.signup,
    municipality: state.formTestConf.municipality,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    onSignup: bindActionCreators(fetchSignupAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupComponents));
