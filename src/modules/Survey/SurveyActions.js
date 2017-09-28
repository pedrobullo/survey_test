import swal from 'sweetalert2';

import inputs from '../../util/mock.json';
import localStorageHelper from '../../util/localStorageHelper';
import createThumbnail from '../../util/imageThumb';

import { surveyResponsesValidation } from '../../models/survey';

// Export Constants
export const FETCH_SURVEY = 'FETCH_SURVEY';
export const FETCH_SURVEY_SUCCESS = 'FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_FAIL = 'FETCH_SURVEY_FAIL';
export const ADD_SURVEY = 'ADD_SURVEY';
export const UPDATE_SURVEY = 'UPDATE_SURVEY';
export const UPDATE_SURVEY_SUCCESS = 'UPDATE_SURVEY_SUCCESS';
export const UPDATE_SURVEY_FAIL = 'UPDATE_SURVEY_FAIL';
export const RESUME_SURVEY = 'RESUME_SURVEY';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS';
export const UPDATE_AVATAR_FAIL = 'UPDATE_AVATAR_FAIL';

const LS_RESPONSES = 'easynvest_form_responses';
const LS_AVATAR = 'easynvest_form_avatar';

// Export Actions
export const addSurvey = (survey) => ({ type: ADD_SURVEY, survey });
export const resumeSurvey = (backup) => ({ type: RESUME_SURVEY, backup });
export const errorSurvey = (error) => ({ type: FETCH_SURVEY_FAIL, error });
export const fechingSurvey = () => ({ type: FETCH_SURVEY });
export const fechingSuccessSurvey = () => ({ type: FETCH_SURVEY_SUCCESS });
export const updatingSurvey = () => ({ type: UPDATE_SURVEY });
export const updatingSurveySuccess = () => ({ type: UPDATE_SURVEY_SUCCESS });
export const updatingSurveyFail = (error) => ({ type: UPDATE_SURVEY_FAIL, error });
export const updatingAvatar = () => ({ type: UPDATE_AVATAR });
export const updatingAvatarSuccess = (image) => ({ type: UPDATE_AVATAR_SUCCESS, avatar: image });
export const updatingAvatarFail = () => ({ type: UPDATE_AVATAR_FAIL });

// Fetch survey inputs
export const fetchSurvey = () =>
  (dispatch) => {
    dispatch(fechingSurvey());

    if (inputs.fields) {
      return setTimeout(() => { // Fake Loading delay
        // Request BACKUP responses from Local Storage
        const LS_BACKUP = localStorageHelper.get(LS_RESPONSES);
        const LS_BACKUP_AVATAR = localStorageHelper.get(LS_AVATAR);
        const backup = {
          responses: ((LS_BACKUP || {}).survey || {}).responses,
          avatar: LS_BACKUP_AVATAR || '',
        };

        if (backup.responses || backup.avatar) {
          dispatch(resumeSurvey(backup));
        }

        dispatch(addSurvey(inputs));
        dispatch(fechingSuccessSurvey());
      }, 1000);
    }

    swal('Erro', 'Error getting survey form.', 'error').catch(swal.noop);
    return errorSurvey('Error getting survey form.');
  };

export const submitSurvey = (survey) =>
  (dispatch) => {
    dispatch(updatingSurvey());

    // Validate - JSON Schema
    const validateSchema = surveyResponsesValidation(survey.survey.responses);

    if (!validateSchema.valid) {
      const errors = validateSchema.errors.map(error => error.message);
      const errorMsg = `${errors.join('<br/>')}`;

      swal('Erro', errorMsg, 'error').catch(swal.noop);

      return dispatch(updatingSurveyFail(validateSchema.errors));
    }

    return setTimeout(() => {
      localStorageHelper.set(LS_RESPONSES, survey);
      dispatch(updatingSurveySuccess());
    }, 1000); // Fake Loading delay
  };

export function uploadAvatar(file) {
  return (dispatch) => {
    dispatch(updatingAvatar());

    if (!file[0] || !(file[0].type || '').includes('image')) {
      swal('Erro', 'Imagem inválida.', 'error').catch(swal.noop);
      return dispatch(updatingAvatarFail());
    }

    const reader = new FileReader();
    reader.onload = (e) =>
      setTimeout(() => {
        createThumbnail(e.target.result) // Creating thumb promise
          .then((thumbnail) => {
            localStorageHelper.set(LS_AVATAR, thumbnail);
            dispatch(updatingAvatarSuccess(thumbnail));
          });
      }, 1000); // Fake Loading delay

    return reader.readAsDataURL(file[0]);
  };
}

export const clearSurveyStorage = () => {
  localStorage.removeItem(LS_RESPONSES);
  localStorage.removeItem(LS_AVATAR);
  window.location.href = '/';
};


window.clearSurveyStorage = () => clearSurveyStorage();

if (process.env.NODE_ENV !== 'test') {
  console.warn('>>>>>> Para limpar o localStorage use o comando: clearSurveyStorage()'); // eslint-disable-line
}

