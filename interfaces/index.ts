export type ResponseType = {
  data: [] | {} | null;
  message?: string;
  success: boolean;
};

export type Project = {
  // TODO: will improve this later
  id: string | number;
  author: string;
  title: string;
  description: string;
  image?: string; // made it array of string because there might be multiple images for the project
  githubRepository?: string;
  tags: string[];
};
