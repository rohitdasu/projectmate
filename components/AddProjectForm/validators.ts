export const project_name = {
  name: 'projectName',
  type: 'text',
  id: 'projectName',
  placeholder: 'Enter your project name',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 100,
      message: '100 characters max',
    },
    minLength: {
      value: 3,
      message: '3 characters minimum',
    },
  },
};

export const repository_url = {
  name: 'repositoryURL',
  type: 'text',
  id: 'repositoryURL',
  placeholder: 'Enter your repository URL',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value: /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
      message: 'invalid github repository',
    },
  },
};

export const description = {
  name: 'description',
  type: 'text',
  id: 'description',
  placeholder: 'Enter project description',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 160,
      message: 'description must be at least 160 characters',
    },
  },
  multiline: true,
};
