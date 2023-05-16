import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components';
import Image from 'next/image';

interface Profile {
  id: string;
  name: string;
  profilePicture: string;
}

const Mates: NextPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('https://www.projectmate.net/api/user/all');
      const data = await response.json();
      if (data.success) {
        setProfiles(data.results);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profiles:', error);
    }
  };

  return (
    <>
      <header className="sr-only">
        <h1>Mates</h1>
      </header>
      <SharedLayout title="Mates">
        <div className="flex flex-wrap justify-center">
          {profiles.map((profile) => (
            <div key={profile.id} className="w-1/2 p-4 sm:w-1/4 md:w-1/6">
              <div className="rounded-lg bg-white p-6 shadow">
                <Image
                  src={profile.profilePicture}
                  alt={profile.name}
                  className="mx-auto mb-4 h-16 w-16 rounded-full"
                />
                <h2 className="text-lg font-bold">{profile.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </SharedLayout>
    </>
  );
};

export default Mates;
