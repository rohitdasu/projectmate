import React from 'react';
import { IPeople } from './People.interface';
import { Person } from './Person';

export const People = (data: IPeople) => {
  const { data: pupil } = data;
  return (
    <div className="mx-4 flex flex-row flex-wrap items-center justify-between gap-4 md:mx-1 md:justify-around">
      {pupil?.map((person) => {
        return (
          <Person key={person.id + person.name + new Date()} {...person} />
        );
      })}
    </div>
  );
};
