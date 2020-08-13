import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import MainPage from '../components';

function mapStateToProps(state) {
  const { i18n: { literals } } = state;
  const {
    routes, pcrResults,
  } = literals;
  return {
    literals: {
      ...pcrResults, routes,
    },
    literalsIntro: state.i18n.literals.welcome,
    user: state.session.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
