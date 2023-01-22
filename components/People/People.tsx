import React from 'react';
import { IPeople } from './People.interface';
import { Person } from './Person';

export const People = (data: IPeople) => {
  const { data: pupil } = data;
  return (
    <div className="mx-4 flex flex-row flex-wrap items-center justify-around gap-4">
      {pupil?.map((person) => {
        return (
          <Person key={person.id + person.name + new Date()} {...person} />
        );
      })}
    </div>
  );
};
