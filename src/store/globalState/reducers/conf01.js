import { sessionReducer as session } from 'redux-react-session';
import location from 'routes/MainPage/routes/TestingCenters/modules';
import showContagiosMap from 'routes/MainPage/components/ContagiosIFrame/modules';
import i18n from 'components/LanguageSelector/modules';
import signup from 'routes/Signup/modules';
import validation from 'routes/Confirmation/modules';
import results from 'routes/Results/modules';
import formTestConf from 'routes/FormTest/modules';
import global from '../global';

export default {
  session,
  i18n,
  formTestConf,
  signup,
  global,
  validation,
  results,
  location,
  showContagiosMap,
};
