import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingAction } from '../../../../../store/globalState/global';
import MunicipalitiesComponent from '../components';
import { saveLocation } from '../modules/actions';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.municipalities,
    location: state.location,
    favorites: state.session.user.semaphoreFav || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(loadingAction, dispatch),
    saveLocation: bindActionCreators(saveLocation, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalitiesComponent);
