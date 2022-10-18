import toast from 'react-hot-toast';

export enum messageType {
  success = 'success',
  error = 'error',
}

let lastMessage = '';

export const toastMessage = (message: string, type: messageType) => {
  if (lastMessage === message) {
    toast.dismiss();
  }
  toast[type](message);
  lastMessage = message;
};
