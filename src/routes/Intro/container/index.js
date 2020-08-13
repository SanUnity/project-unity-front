import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import { userSignupAnonymousAction } from 'routes/Confirmation/modules/actions';
import setMunicipalityConfigurationAction from 'routes/FormTest/modules/actions';
import Intro from '../components';

function mapStateToProps(state) {
  return {
    literals: {
      welcome: state.i18n.literals.welcome,
      splashScreen: state.i18n.literals.splashScreen,
      onboarding: state.i18n.literals.onboarding,
    },
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    onSignupAnonymous: bindActionCreators(userSignupAnonymousAction, dispatch),
    setMunicipalityConfiguration: bindActionCreators(setMunicipalityConfigurationAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Intro));
