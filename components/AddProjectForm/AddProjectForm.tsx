import React from 'react';
import Router from 'next/router';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Input, InputError, messageType, toastMessage } from '@/components';
import { project_name, repository_url, description } from './validators';
import { AnimatePresence } from 'framer-motion';
import { BiLoaderCircle } from 'react-icons/bi';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';

export const AddProjectForm = () => {
  const [loading, setLoading] = React.useState(false);
  const methods = useForm();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        loading...
      </div>
    );
  }

  const resetFormData = () => {
    methods.reset();
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post(
        '/api/project',
        {
          title: data.projectName,
          description: data.description,
          githubRepository: data.repositoryURL,
          tags: data.tags,
          content: '',
          email: session?.user?.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toastMessage('project added successfully', messageType.success);
      resetFormData();
    } catch (e) {
      toastMessage(
        e?.response?.data?.error?.issues[0]?.message,
        messageType.error
      );
    } finally {
      setLoading(false);
    }
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
              <div className="flex flex-col gap-2">
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
            className="rounded-md bg-green-600 p-3 uppercase transition-all hover:bg-green-700"
          >
            {loading && <BiLoaderCircle className="animate-spin text-2xl" />}
            {!loading && <span>submit</span>}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
