import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import BTStatusComponents from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.btstatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BTStatusComponents));
