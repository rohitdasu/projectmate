import React from 'react';
import { resolveValue, Toaster, ToastBar } from 'react-hot-toast';

export const AppToaster = () => {
  return (
    <Toaster position="top-center" toastOptions={{ className: 'app-toaster' }}>
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
                className={`pl-2 text-white`}
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
