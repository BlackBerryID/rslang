import { base } from './api';
// const local = 'http://localhost:3007';

export const GetWords = async (group = 0, page = 0) => {
  try {
    const rawResponse = await fetch(
      `${base}/words?group=${group}&page=${page}`
    );
    const words = await rawResponse.json();
    if (words.length === 0)
      throw new Error('Check your request >>>>> Beyond the textbook');
    return words;
  } catch (error) {
    if (error instanceof Error) console.error('Error caught >>>>> ' + error);
  }
};
