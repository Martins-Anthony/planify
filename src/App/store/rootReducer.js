import { combineReducers } from 'redux';
import dashboardReducer from '../../containers/Dashboard/dashboardSlice';

const rootReducer = combineReducers({ dashboard: dashboardReducer });

export default rootReducer;
