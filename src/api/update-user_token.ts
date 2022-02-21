import { base } from '.';

export const UpdateUserToken = async (userId: string) => {
  try {
    const url = `${base}/users/${userId}/tokens`;
    const refreshToken = JSON.parse(localStorage.getItem('name') as string).refreshToken;
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const updatedToken = await rawResponse.json();
    console.log(updatedToken);
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: updatedToken.name,
        token: updatedToken.token,
        refreshToken: updatedToken.refreshToken,
        userId: updatedToken.userId,
      })
    );
    switch (rawResponse.status) {
      case 403:
      // token is expired
      // TODO: logout and refresh page @saratovkin
    }
  } catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
