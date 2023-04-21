import React from 'react';
import { resolveValue, Toaster, ToastBar, toast } from 'react-hot-toast';

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

export const AppToaster = () => {
  return (
    <Toaster position="top-center">
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? 'custom-enter 1s ease'
              : 'custom-exit 1s ease',
          }}
        >
          {({ icon }) => (
            <>
              {icon}
              <label
                role="status"
                aria-live="polite"
                className={`pl-2 text-black`}
              >
                {resolveValue(t.message, t)}
              </label>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
