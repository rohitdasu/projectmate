export const money_validation = {
  name: 'money',
  label: 'e-Money Number',
  type: 'number',
  id: 'money',
  placeholder: '238521993',
  validation: {
    required: {
      value: true,
      message: 'Required',
    },
    pattern: {
      value: /^[0-9]*$/,
      message: 'Digits only',
    },
  },
};
