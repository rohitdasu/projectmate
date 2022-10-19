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

export const SubmitForm = () => {
  const methods = useForm();
  const [tags, setTags] = useState([]);

  const handleTagsChange = (e: any) => {
    if (e.target.value.trimStart().includes(' ')) {
      setTags((prev) => [...prev, e.target.value.trim()]);
      setTimeout(() => {
        methods.resetField('tag');
      }, 1);
    }
  };

  // const handleSubmit = methods.handleSubmit((data) => console.log(data));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => console.log(data))}
        className="flex flex-col items-start gap-10"
      >
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          <Input {...project_name_validation} />
          <Input {...project_url_validation} />
        </div>
        <Input {...project_desc_validation} />
        <Input {...project_content_validation} />
        <Input {...project_tags_validation} onChange={handleTagsChange} />
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {tags.map((txt, idx) => {
              return (
                <li key={idx}>
                  <button
                    onClick={() =>
                      setTags((prev) => {
                        return prev.filter((i) => i !== txt);
                      })
                    }
                    className="flex items-center gap-4 rounded-md bg-background-2 p-2 text-blue-500"
                  >
                    {txt}
                    <AiOutlineClose />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button className="rounded-md bg-blue-600 p-3 text-white">
          Submit Project
        </button>
      </form>
    </FormProvider>
  );
};
