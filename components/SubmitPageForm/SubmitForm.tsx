import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../FormElements';
import {
  project_name_validation,
  project_url_validation,
  project_desc_validation,
  project_content_validation,
  project_tags_validation,
} from '../../utils/input_validators';
import { motion } from 'framer-motion';

export const SubmitForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <motion.form
        onSubmit={methods.handleSubmit((data) => console.log(data))}
        className="flex flex-col items-start gap-10"
      >
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          <Input {...project_name_validation} />
          <Input {...project_url_validation} />
        </div>
        <Input {...project_desc_validation} />
        <Input {...project_content_validation} />
        <Input
          {...project_tags_validation}
          onChange={(e) => console.log(e.target.value)}
        />
        <button className="rounded-md bg-blue-600 p-3 text-white">
          Submit Project
        </button>
      </motion.form>
    </FormProvider>
  );
};
