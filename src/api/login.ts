import { base } from './api';

const loginUser = async (email: string, password: string) => {
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

// Console:
// {
//   "message":"Authenticated",
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I",
//   "userId":"5ec993df4ca9d600178740ae"
// }

export default loginUser;
