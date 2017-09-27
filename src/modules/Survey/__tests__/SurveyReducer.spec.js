import test from 'ava';
import { reducerTest } from 'redux-ava';

import SurveyReducer from '../SurveyReducer';
import { addSurvey } from '../SurveyActions';

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
  ],
};

test('action for ADD_SURVEY is working', reducerTest(
  SurveyReducer,
  { survey: { fields: [] } },
  addSurvey(survey),
  {
    survey: {
      fields: [{
        template: 'input',
        name: 'txtFullname',
        id: 'txtFullname',
        value: '',
        type: 'text',
        class: 'input',
      }],
    },
  },
));

