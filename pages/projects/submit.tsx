import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitPageForm } from '@/components/SubmitPageForm';
import { SubmitForm } from '@/components/SubmitPageForm/SubmitForm';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="mt-4 mb-12 flex w-full flex-col space-y-4 px-0 lg:px-4">
        {/* <SubmitPageForm /> */}
        <SubmitForm />
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
