import { base } from './api';

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
  }
};
