import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../FormElements';
import {
  project_name_validation,
  project_url_validation,
  project_desc_validation,
  project_content_validation,
  project_tags_validation,
} from '../../utils/input_validators';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { InputError } from '../FormElements/Error';
import { AnimatePresence } from 'framer-motion';

interface ITest {
  prev: string;
}

export const SubmitForm = () => {
  const methods = useForm();
  const [tags, setTags] = useState<any>([]);

  const handleTagsChange = (e: any) => {
    if (e.target.value.trimStart().includes(' ')) {
      setTags((prev: any) => [...prev, e.target.value.trim()]);
      setTimeout(() => {
        methods.resetField('tag');
      }, 1);
    }
  };

  const noTag = methods.formState.isSubmitted && tags.length < 1;
  const key = noTag ? 'keeey' : 'kjfhakjfsh';

  const handleSubmit = methods.handleSubmit((data) => {
    // successfull form submission data
    const { tag, ...formData } = data;
    console.log({ ...formData, tags });
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-start gap-10"
      >
        <div className="flex flex-col w-full gap-10 lg:flex-row">
          <Input {...project_name_validation} />
          <Input {...project_url_validation} />
        </div>
        <Input {...project_desc_validation} />
        <Input {...project_content_validation} />
        <div className="flex flex-col w-full gap-3">
          <Input {...project_tags_validation} onChange={handleTagsChange} />
          <AnimatePresence mode="wait" initial={false}>
            {noTag && (
              <InputError message="you must add at least one tag" key={key} />
            )}
          </AnimatePresence>
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {tags.map((txt: string, idx: number) => {
                return (
                  <li key={idx}>
                    <button
                      onClick={() =>
                        setTags((prev: any) => {
                          return prev.filter((i) => i !== txt);
                        })
                      }
                      className="flex items-center gap-4 p-2 text-blue-500 rounded-md bg-background-2"
                    >
                      {txt}
                      <AiOutlineClose />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          className="p-5 text-lg text-white bg-blue-600 rounded-md"
          onClick={handleSubmit}
        >
          Submit Project
        </button>
      </form>
    </FormProvider>
  );
};
