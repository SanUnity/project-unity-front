import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../../../store/globalState/global';
import NotificationComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
