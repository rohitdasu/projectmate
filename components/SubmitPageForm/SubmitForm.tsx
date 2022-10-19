import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../FormElements';
import {
  project_name_validation,
  project_url_validation,
  project_desc_validation,
  project_content_validation,
} from '../../utils/input_validators';

export const SubmitForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => console.log(data))}
        className="flex flex-col items-start gap-3"
      >
        <Input {...project_name_validation} />
        <Input {...project_url_validation} />
        <Input {...project_desc_validation} />
        <Input {...project_content_validation} />
        <button className="rounded-md bg-blue-600 p-3 text-white">
          Submit Project
        </button>
      </form>
    </FormProvider>
  );
};
