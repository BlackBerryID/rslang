import { base } from './api';
import { UpdateUserToken } from './update-user_token';

type AgregatedFilter = {
  $and?: Array<object>;
  $or?: Array<object>;
};

type AgregatedReq = {
  group?: number;
  page?: number;
  userId: string;
  userToken: string;
  wpp: number;
  filter?: AgregatedFilter;
};

export const GetUserAgrWords = async ({
  group,
  page,
  userId,
  userToken,
  wpp,
  filter,
}: AgregatedReq) => {

  let paginated;
  if (page !== undefined && group !== undefined) {
    paginated = { $and: [{ page }, { group }] };
  } else if (group !== undefined) {
    paginated = {
      $and: [{ group }],
    };
  } else {
    paginated = null;
  }

  let filtResult = '&filter=';

  if (filter && paginated) {
    filtResult += encodeURIComponent(
      JSON.stringify({
        [Object.keys(filter)[0]]: [...Object.values(filter)[0], paginated],
      })
    );
  } else if (paginated || filter) {
    filtResult += encodeURIComponent(JSON.stringify(paginated || filter));
  }

  const url = `${base}/users/${userId}/aggregatedWords?wordsPerPage=${wpp}${filtResult}`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    return await rawResponse.json();
  }
  if (rawResponse.status === 401) {
    UpdateUserToken(userId);
  }
};

export type { AgregatedReq };
