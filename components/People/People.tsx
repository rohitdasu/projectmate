import React from 'react';
import { IPeople } from './People.interface';
import { Person } from './Person';

export const People = (data: IPeople) => {
  const { data: pupil } = data;
  return (
    <div className="mx-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {pupil?.map((person) => {
        return (
          <Person key={person.id + person.name + new Date()} {...person} />
        );
      })}
    </div>
  );
};
