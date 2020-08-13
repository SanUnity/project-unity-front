import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import EditProfileComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.profileDetails,
    userLang: state.i18n.language,
    mainProfile: state.session.user.mainProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent),
);
