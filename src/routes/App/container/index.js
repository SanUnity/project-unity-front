import { connect } from 'react-redux';
import AppComponents from '../components';

const mapStateToProps = state => ({
  literals: state.i18n.literals,
  sessionChecked: state.session.checked,
  isAuthenticated: state.session.authenticated,
  user: state.session.user,
  loading: state.global.loading,
  router: state.router,
});

export default connect(mapStateToProps)(AppComponents);
