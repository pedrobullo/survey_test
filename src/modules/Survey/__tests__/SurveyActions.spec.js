import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  addSurvey,
  fetchSurvey,
  submitSurvey,
  FETCH_SURVEY_SUCCESS,
  ADD_SURVEY,
  UPDATE_SURVEY_SUCCESS,
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

const payload = {
  survey: {
    createdAt: new Date(),
    responses: { txtFullname: 'test name' },
  },
};

test('should return the correct type for addSurvey', actionTest(
  addSurvey,
  survey,
  { type: ADD_SURVEY, survey },
));

test('should return the correct type for fetchSurvey', actionTest(
  fetchSurvey,
  { type: FETCH_SURVEY_SUCCESS },
));


test('should return the correct type for submitSurvey', actionTest(
  submitSurvey,
  payload,
  { type: UPDATE_SURVEY_SUCCESS },
));
