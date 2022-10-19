import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitPageForm } from '@/components/SubmitPageForm';
import { SubmitForm } from '@/components/SubmitPageForm/SubmitForm';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="flex w-full flex-col p-4">
        {/* <SubmitPageForm /> */}
        <SubmitForm />
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
