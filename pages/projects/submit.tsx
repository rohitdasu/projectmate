import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitPageForm } from '@/components/SubmitPageForm';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="m-auto mb-12 flex w-full flex-col space-y-4 overflow-hidden rounded-lg pt-4 md:max-w-xl md:p-6">
        <SubmitPageForm />
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
