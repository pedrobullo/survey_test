import revalidator from 'revalidator';

import validateCPF from '../util/schemaValidateCPF';

const surveySchema = {
  properties: {
    txtFullname: {
      description: 'Nome completo',
      type: 'string',
      required: true,
      messages: {
        required: 'Requer nome completo',
      },
    },
    txtTelephone: {
      description: 'Celular',
      type: 'string',
      pattern: /^((\+55)?( )?(\(?([1-9]{2}\)?))( )?([\d]{4,5})(-| )?([\d]){4,5})$/, // eslint-disable-line
      required: true,
      size: 14,
      messages: {
        required: 'Requer Celular',
        pattern: 'Celular inválido',
      },
    },
    txtCpf: {
      description: 'CPF',
      type: 'string',
      conform: function (value) { return validateCPF(value); },
      allowEmpty: false,
      size: 14,
      messages: {
        conform: 'CPF inválido',
        allowEmpty: 'CPF obrigatório',
        pattern: 'CPF inválido',
      },
    },
    txtAddress: {
      description: 'Endereço',
      allowEmpty: false,
      messages: {
        allowEmpty: 'Endereço é obrigatório',
      },
    },
    txtComplement: {
      description: 'Complemento',
      allowEmpty: true,
      type: 'string',
    },
  },
};

const surveyResponsesValidation = (data) => revalidator.validate(data, surveySchema);

export { surveyResponsesValidation };
