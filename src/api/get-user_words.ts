import { base } from './api';

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

// Request example:
// GetUserAgrWords({
//   // group: 0 - optional!,
//   // page: 0 - optional!,
//   userId: 'id',
//   userToken: 'token',
//   wpp: 20,
//   filter: {
//     $and: [{ ['userWord.difficulty']: 'learning' }],
//   },
// })

// Pages and groups http-query parameters don't work correctly, they must be passed with filters..

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
  return rawResponse.status > 299
    ? rawResponse.status
    : { ...(await rawResponse.json()) };
};

export type { AgregatedReq };
