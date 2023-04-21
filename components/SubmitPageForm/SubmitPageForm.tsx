import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components';

export const SubmitPageForm = () => {
  const methods = useForm();

  const project_name = {
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
    },
  };

  const repository_url = {
    name: 'repositoryURL',
    type: 'text',
    id: 'repositoryURL',
    placeholder: 'Enter your repository URL',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
    },
  };

  const description = {
    name: 'description',
    type: 'text',
    id: 'description',
    placeholder: 'Enter project description',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
    },
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col space-y-4"
        >
          <Input {...project_name} />
          <Input {...repository_url} />
          <Input {...description} />
          <button onClick={onSubmit}>submit</button>
        </form>
      </FormProvider>
    </div>
  );
};
