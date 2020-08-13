import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../../../store/globalState/global';
import FaqComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.faq,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqComponent);
