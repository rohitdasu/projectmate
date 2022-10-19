export const name_validation = {
  name: 'name',
  label: 'نام',
  type: 'text',
  id: 'name',
  placeholder: 'یزدان فتحعلی',
  validation: {
    required: {
      value: true,
      message: 'الزامی',
    },
    maxLength: {
      value: 30,
      message: 'حداکثر 30 حرف',
    },
  },
};

export const desc_validation = {
  name: 'desc',
  label: 'توضیحات',
  multiline: true,
  id: 'desc',
  placeholder: 'توضیحات خود را بنویسید ...',
  validation: {
    required: {
      value: true,
      message: 'الزامی',
    },
    maxLength: {
      value: 200,
      message: 'حداکثر 200 حرف',
    },
  },
};

export const phone_validation = {
  name: 'mobile',
  label: 'موبایل',
  type: 'number',
  id: 'mobile',
  placeholder: '09201378001',
  validation: {
    required: {
      value: true,
      message: 'الزامی',
    },
    pattern: {
      value: /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/,
      message: 'نامعتبر',
    },
  },
};
