import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../store/globalState/global';
import ResultsComponent from '../components';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.results,
    resultsOk: state.results.status === 'negative',
    result: state.results || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsComponent);
