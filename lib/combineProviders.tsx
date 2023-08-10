import React, { FC, PropsWithChildren } from 'react';

export const combineProviders = (providers: FC<PropsWithChildren>[]) => {
  const CombinedProvider = ({ children }: PropsWithChildren) => {
    return (
      <>
        {providers.reduce((acc, Provider) => {
          return <Provider>{acc}</Provider>;
        }, children)}
      </>
    );
  };

  return CombinedProvider;
};
