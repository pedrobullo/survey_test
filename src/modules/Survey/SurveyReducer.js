import {
  FETCH_SURVEY,
  FETCH_SURVEY_SUCCESS,
  FETCH_SURVEY_FAIL,
  ADD_SURVEY,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAIL,
  RESUME_SURVEY,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
} from './SurveyActions';

// Initial State
const initialState = {
  loading: false,
  error: false,
  loadingUpdate: false,
  responses: {},
  loadingAvatar: false,
};

const SurveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEY:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SURVEY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FETCH_SURVEY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case ADD_SURVEY:
      return {
        ...state,
        ...action.survey,
      };

    case UPDATE_SURVEY:
      return {
        ...state,
        errorUpdate: false,
        loadingUpdate: true,
      };

    case UPDATE_SURVEY_SUCCESS:
      return {
        ...state,
        errorUpdate: false,
        loadingUpdate: false,
      };

    case UPDATE_SURVEY_FAIL:
      return {
        ...state,
        errorUpdate: action.error,
        loadingUpdate: false,
      };

    case RESUME_SURVEY:
      return {
        ...state,
        responses: action.backup.responses,
        avatar: action.backup.avatar,
      };

    case UPDATE_AVATAR:
      return {
        ...state,
        loadingAvatar: true,
      };

    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        avatar: action.avatar,
        loadingAvatar: false,
      };

    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        loadingAvatar: false,
      };

    default:
      return state;
  }
};

// Export Reducer
export default SurveyReducer;
