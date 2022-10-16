import * as yup from 'yup';

export const schema = yup
  .object({
    tags: yup
      .array()
      .required('tags are required')
      .min(1, 'minimum 1 tag is required'),
    projectName: yup
      .string()
      .required('project name is required')
      .min(2, 'project name should be at least 2 characters long'),
    repositoryLink: yup
      .string()
      .required('repository link is required')
      .matches(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
        'repository link is invalid'
      ),
    projectDescription: yup
      .string()
      .required('project description is required')
      .min(160, 'project description should be at least 160 characters long'),
    coverImage: yup.string(),
    content: yup.string(),
  })
  .required();
