import React, { useState } from 'react';
import { resolveValue, Toaster, ToastBar } from 'react-hot-toast';
import { useTheme } from 'next-themes';

export const AppToaster = () => {
  const { theme } = useTheme();

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
                className={`text-md pl-2 ${theme === 'dark' && 'text-white'}`}
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
