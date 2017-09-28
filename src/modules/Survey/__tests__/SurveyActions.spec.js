import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  addSurvey,
  resumeSurvey,
  errorSurvey,
  fechingSurvey,
  fechingSuccessSurvey,
  updatingSurvey,
  updatingSurveySuccess,
  updatingSurveyFail,
  updatingAvatar,
  updatingAvatarSuccess,
  updatingAvatarFail,
  RESUME_SURVEY,
  ADD_SURVEY,
  FETCH_SURVEY,
  FETCH_SURVEY_FAIL,
  FETCH_SURVEY_SUCCESS,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAIL,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
} from '../SurveyActions';

const survey = {
  fields: [
    {
      template: 'input',
      name: 'txtFullname',
      id: 'txtFullname',
      value: '',
      type: 'text',
      class: 'input',
    },
    {
      template: 'input',
      name: 'txtCpf',
      id: 'txtCpf',
      value: '',
      type: 'text',
      mask: '000.000.000-00',
      class: 'input',
    },
  ],
};

const backup = { responses: {}, avatar: '' };
const error = 'This is an error';
const avatar = 'This should be a base64 string';
const errorOnUpdate = { valid: false, errors: [] }; // Revalidator error object pattern

test('should return the correct type for addSurvey', actionTest(
  addSurvey,
  survey,
  { type: ADD_SURVEY, survey },
));

test('should return the correct type for resumeSurvey', actionTest(
  resumeSurvey,
  backup,
  { type: RESUME_SURVEY, backup },
));

test('should return the correct type for errorSurvey', actionTest(
  errorSurvey,
  error,
  { type: FETCH_SURVEY_FAIL, error },
));

test('should return the correct type for fechingSurvey', actionTest(
  fechingSurvey,
  { type: FETCH_SURVEY },
));

test('should return the correct type for fechingSuccessSurvey', actionTest(
  fechingSuccessSurvey,
  { type: FETCH_SURVEY_SUCCESS },
));

test('should return the correct type for updatingSurvey', actionTest(
  updatingSurvey,
  { type: UPDATE_SURVEY },
));

test('should return the correct type for updatingAvatar', actionTest(
  updatingAvatar,
  { type: UPDATE_AVATAR },
));

test('should return the correct type for updatingAvatarSuccess', actionTest(
  updatingAvatarSuccess,
  avatar,
  { type: UPDATE_AVATAR_SUCCESS, avatar },
));

test('should return the correct type for updatingSurveySuccess', actionTest(
  updatingSurveySuccess,
  avatar,
  { type: UPDATE_SURVEY_SUCCESS },
));

test('should return the correct type for updatingSurveyFail', actionTest(
  updatingSurveyFail,
  errorOnUpdate,
  { type: UPDATE_SURVEY_FAIL, error: errorOnUpdate },
));

test('should return the correct type for updatingAvatarFail', actionTest(
  updatingAvatarFail,
  { type: UPDATE_AVATAR_FAIL },
));
