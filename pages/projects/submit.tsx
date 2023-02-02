import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitPageForm } from '@/components/SubmitPageForm';
import { motion } from 'framer-motion';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="m-auto mb-12 flex w-full flex-col space-y-4 overflow-hidden rounded-lg pt-4 md:max-w-xl md:p-6"
      >
        <SubmitPageForm />
      </motion.div>
    </SharedLayout>
  );
};

export default SubmitProject;
