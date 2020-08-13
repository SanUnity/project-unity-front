import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from 'store/globalState/global';
import Profile from '../components';


function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Profile);
