import { Dispatch, SetStateAction, useState } from 'react';
import Router from 'next/router';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Input, InputError } from '@/components/Common/Form';
import { messageType, toastMessage } from '@/components/Toaster';
import { project_name, repository_url, description } from './validators';
import { AnimatePresence } from 'framer-motion';
import { BiLoaderCircle } from 'react-icons/bi';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import { useFetchPaginatedData } from '@/hooks/useFetchHook';

interface AddProjectProps {
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}

export const AddProjectForm = ({ setIsClicked }: AddProjectProps) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm();

  const { mutate } = useFetchPaginatedData('/api/project');

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
      mutate();
      setIsClicked(true);
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
    <div className="mx-auto w-full px-4 pb-6 md:w-2/3 lg:w-1/2">
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
              <div className="flex w-full flex-col gap-2">
                <TagsInput
                  className="w-full rounded-md border-2 border-gray-900 bg-gray-800 p-4 font-medium placeholder:opacity-50 focus:border-blue-500 focus:outline-none"
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
            className="flex justify-center rounded-md bg-emerald-700 p-3 uppercase transition-all hover:bg-emerald-800"
          >
            {loading && <BiLoaderCircle className="animate-spin text-2xl" />}
            {!loading && <span>submit</span>}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
