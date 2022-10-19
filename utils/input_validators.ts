export const project_name_validation = {
  name: 'name',
  label: 'Project Name',
  type: 'text',
  id: 'name',
  placeholder: 'Enter your project name',
  validation: {
    required: {
      value: true,
      message: 'project name is required',
    },
  },
};

export const project_url_validation = {
  name: 'repo',
  label: 'Repository URL',
  type: 'text',
  id: 'repo',
  placeholder: 'Enter your repository URL',
  validation: {
    required: {
      value: true,
      message: 'repository url is required',
    },
    pattern: {
      value:
        /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
      message: 'not a valid url',
    },
  },
};

export const project_desc_validation = {
  name: 'desc',
  label: 'Description',
  type: 'text',
  id: 'desc',
  placeholder: 'Enter your project description',
  multiline: true,
  validation: {
    required: {
      value: true,
      message: 'description is required',
    },
    minLength: {
      value: 160,
      message: 'description should be at least 160 characters',
    },
  },
};

export const project_content_validation = {
  name: 'md',
  label: 'Content',
  type: 'text',
  id: 'md',
  placeholder: 'Write some markdown for your project content',
  multiline: true,
};
