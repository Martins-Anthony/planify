import { combineReducers } from 'redux';
import dashboardReducer from '../../containers/Dashboard/dashboardSlice';
import modalReducer from '../../containers/Modal/modalSlice';
import eventReducer from '../../containers/EventForm/eventFormSlice';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  modal: modalReducer,
  event: eventReducer,
});

export default rootReducer;
