import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../../../store/globalState/global';
import ProfileComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.profile,
    literalsResults: state.i18n.literals.results,
    literalsPCR: {
      test2: state.i18n.literals.test2,
      pcrTest: state.i18n.literals.pcrTest,
    },
    profiles: state.session.user.profiles || [],
    phone: state.session.user.phone || '',
    btActive: state.session.user.bt_active || false,
    state: state.session.user.state || '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
