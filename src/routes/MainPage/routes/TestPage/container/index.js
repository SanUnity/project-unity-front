import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import { setPlatformLanguageAction } from 'components/LanguageSelector/modules/actions';
import TestPage from '../components';

function mapStateToProps(state) {
  const { i18n: { literals } } = state;
  const {
    test, test1, test2, results, pcrTest,
  } = literals;
  return {
    literals: {
      ...test, test1, test2, results, pcrTest,
    },
    profiles: state.session.user.profiles || [],
    btActive: state.session.user.bt_active || false,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    changeLang: bindActionCreators(setPlatformLanguageAction, dispatch),
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPage));
