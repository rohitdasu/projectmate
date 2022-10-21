import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitForm } from '@/components/SubmitPageForm/SubmitForm';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="flex w-full flex-col p-4">
        <h1 className="mb-7 border-b pb-7 text-2xl font-bold dark:border-b-gray-800">
          Sumbit Your Project
        </h1>
        <SubmitForm />
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
