import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../../../store/globalState/global';
import NewsComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.news,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsComponent);
