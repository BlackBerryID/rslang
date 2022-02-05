import { base } from './api';
// const local = 'http://localhost:3007';

const GetWords = async (group = 0, page = 0): Promise<Array<Word>> => {
  const rawResponse = await fetch(`${base}/words?group=${group}&page=${page}`);
  return await rawResponse.json();
};

export { GetWords };
