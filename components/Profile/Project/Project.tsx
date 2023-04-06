import { Typography } from '@/components/Typography';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import moment from 'moment';
import axios from 'axios';

interface IProject {
  title: string;
  id: string;
  description: string;
  tags: Array<string>;
  createdAt: string;
  handleDelete: (arg1: string) => void;
}

export const Project: FC<IProject> = ({
  title,
  description,
  id,
  createdAt,
  handleDelete,
}) => {
  const router = useRouter();
  const gotoProjectDetails = (id: string) => {
    router.push(`/projects/${id}`);
  };
  //delteProject function is responsible to call the delete API when the yes button is clicked in the popup
  async function deleteProject(id: string) {
    const url = `/api/user/project?projectId=${id}`;
    const result = await axios
      .delete(`/api/user/project?projectId=${id}`)
      .then((res) => res.data)
      .catch((error) => error.message);
    closeModal();
    //once the delete operation has been performed the profile page has to be updated with new list of projects so handleDelete is a props passed by the parent component which let the parent component knows that a project has been deleted so that parent component can update the state
    handleDelete(id);
  }
  // openModal and closeModal functions are responsible for opening and closing of modal
  const openModal = () => {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };
  const closeModal = () => {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex w-full flex-col items-start justify-between gap-4 rounded-lg border border-gray-700 bg-slate-800 p-2 text-gray-100 shadow-border-shadow transition-all hover:shadow-md md:p-4"
    >
      {/*Modal code */}
      <div
        id="myModal"
        className="modal fixed inset-0 z-10 hidden overflow-y-auto"
      >
        <div className="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"></div>
        <div className="modal-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Are you sure you want to delete it?
          </h2>
          <div className="item-center flex flex-row justify-center gap-2 md:gap-3">
            <button
              className="flex flex-row items-center justify-center gap-2 rounded-md bg-green-900 p-3 px-2 py-1 text-red-100 transition-all hover:opacity-70 md:px-3 md:py-2"
              onClick={() => deleteProject(id)}
            >
              <span>Yes</span>
            </button>
            <button
              className="flex flex-row items-center justify-center gap-2 rounded-md bg-red-900 p-3 px-2 py-1 text-red-100 transition-all hover:opacity-70 md:px-3 md:py-2"
              onClick={() => closeModal()}
            >
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
      {/*Motion Code end*/}

      <div className="flex w-full flex-row items-center justify-between">
        <Typography
          as="p"
          fontSize="xl"
          fontWeight="medium"
          className="text-gray-100 sm:text-base"
        >
          {title}
        </Typography>
        <div className="flex flex-row items-center gap-1 text-gray-400">
          <Typography as="span" fontSize="3xl">
            ·
          </Typography>
          <Typography as="p" fontSize="sm" fontWeight="light">
            {moment(createdAt).fromNow()}
          </Typography>
        </div>
      </div>
      <Typography
        as="p"
        fontSize="sm"
        fontWeight="light"
        className="text-gray-300 line-clamp-5 sm:text-base"
      >
        {description}
      </Typography>
      <div className="flex w-full flex-row items-center gap-2 md:gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => gotoProjectDetails(id)}
          className="flex flex-1 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Delete ${title}`}
        >
          <AiFillEye className="text-gray-100" aria-hidden="true" />
          <span>View</span>
        </motion.button>
        <button
          className="flex cursor-not-allowed flex-row items-center justify-center gap-2 rounded-md bg-green-900 px-2 py-1 text-green-100 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Edit ${title}`}
        >
          <FaEdit aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button
          className="flex flex-row items-center justify-center gap-2 rounded-md bg-red-900 p-3 px-2 py-1 text-red-100 transition-all hover:opacity-70 md:px-3 md:py-2"
          aria-label={`Delete ${title}`}
          onClick={() => openModal()}
        >
          <FaTrash aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>
    </motion.li>
  );
};
