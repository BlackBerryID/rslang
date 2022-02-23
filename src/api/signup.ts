import { base } from './api';

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const rawResponse = await fetch(`${base}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return rawResponse.status > 299
    ? rawResponse.status
    : await rawResponse.json();
};
