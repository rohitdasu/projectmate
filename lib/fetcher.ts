import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = async (...args: any[]) => {
  const response = await axios(args[0]);
  if (response.status !== 200) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.data;
};
