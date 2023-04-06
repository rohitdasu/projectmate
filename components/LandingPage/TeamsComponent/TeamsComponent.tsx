import { ContributorList } from '@/components/ContributorList';
import React from 'react';

export const TeamsComponent = () => {
  const url = `https://api.github.com/repos/rohitdasu/projectmate/contributors`;
  const [data, setData] = React.useState([]);
  async function loadContributors() {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
  }

  React.useEffect(() => {
    loadContributors();
  }, []);
  return (
    <section className="py-16 px-2">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <p className="text-xl text-gray-200 md:text-3xl lg:text-4xl">
          Contributors
        </p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          <ContributorList contributors={data} />
        </ul>
      </div>
    </section>
  );
};
