import { base } from './api';

export const loginUser = async (email: string, password: string) => {
  const rawResponse = await fetch(`${base}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const content = await rawResponse.json();

  return content;
};
