import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../FormElements';
import { money_validation } from '../../utils/input_validators';

export const SubmitForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Input {...money_validation} />
        <button>submit</button>
      </form>
    </FormProvider>
  );
};
