export type IContributors = {
  avatar_url: string;
  html_url: string;
};

export type ContributorProps = {
  contributors: IContributors[];
};