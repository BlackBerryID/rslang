import { base } from '.';

export const UpdateUserToken = async (userId: string) => {
  const url = `${base}/users/${userId}/tokens`;
  const localData = localStorage.user ? JSON.parse(localStorage.user) : undefined;
  const refreshToken = localData ? localData.refreshToken : undefined;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    const updatedToken = await rawResponse.json();
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: updatedToken.name,
        token: updatedToken.token,
        refreshToken: updatedToken.refreshToken,
        userId: updatedToken.userId,
      })
    );
  }
};
