import React from 'react';
import { Contributor as ContributorType } from './ContributorsComponent.interface';
import { Contributor } from './Contributor';

export const ContributorsComponent = () => {
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
    <section className="py-16 px-4">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        <p className="text-xl text-gray-200 md:text-3xl lg:text-4xl">
          Contributors
        </p>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {data?.map((contributor: ContributorType) => {
            return <Contributor key={contributor.id} {...contributor} />;
          })}
        </ul>
      </div>
    </section>
  );
};
