/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import survey from './modules/Survey/SurveyReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  survey,
});
