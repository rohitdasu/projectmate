import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Input, InputError } from '@/components';
import { project_name, repository_url, description } from './validators';
import { AnimatePresence } from 'framer-motion';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

export const AddProjectForm = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="w-full px-4 pb-6">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col space-y-4"
        >
          <Input {...project_name} />
          <Input {...repository_url} />
          <Controller
            name="tags"
            defaultValue={[]}
            rules={{ required: 'required' }}
            render={({ field }) => (
              <div>
                <TagsInput
                  className="w-full rounded-md border border-gray-900 bg-gray-800 p-2"
                  value={field.value}
                  maxTags={5}
                  onlyUnique={true}
                  onChange={field.onChange}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {methods.formState.errors.tags && (
                    <InputError
                      message={methods.formState.errors.tags.message}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          />
          <Input {...description} />
          <button
            onClick={onSubmit}
            className="rounded-md bg-green-600 p-3 uppercase hover:bg-green-700"
          >
            submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
