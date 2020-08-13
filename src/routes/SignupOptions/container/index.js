import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import { userSignupAnonymousAction } from 'routes/Confirmation/modules/actions';
import SignupOptions from '../components';

function mapStateToProps(state) {
  return {
    literals: { welcome: state.i18n.literals.welcome, splashScreen: state.i18n.literals.splashScreen },
    municipality: state.formTestConf.municipality,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    onSignupAnonymous: bindActionCreators(userSignupAnonymousAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupOptions));
