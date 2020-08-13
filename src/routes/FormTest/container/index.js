import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadingAction } from 'store/globalState/global';
import FormTestComponent from '../components';
import { submitTest } from '../../Results/modules/actions';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.formTest,
    userLang: state.i18n.language,
    result: state.results || {},
    formTestConf: state.formTestConf.questions || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    submitTest: bindActionCreators(submitTest, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormTestComponent),
);
