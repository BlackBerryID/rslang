import { base } from './api';

type AgregatedFilter = {
  $and?: Array<object>;
  $or?: Array<object>;
};

type AgregatedReq = {
  group: number;
  page: number;
  userId: string;
  userToken: string;
  wpp: number;
  filter?: AgregatedFilter;
};

// {"$and": [{ "userWord.difficulty": "hard", "userWord.optional.key": "value" }]}
// {"$or": [{"userWord.difficulty":"easy"}, {"userWord":null}]}

// Pages and groups http-query parameters don't work correctly, they must be passed with filters..
export const GetUserAgrWords = async ({
  group,
  page,
  userId,
  userToken,
  wpp,
  filter,
}: AgregatedReq) => {
  const paginated = { $and: [{ page }, { group }] };
  const filtResult = filter
    ? JSON.stringify(Object.values(filter)[0].push(paginated))
    : JSON.stringify(paginated);
  const url = `${base}/users/${userId}/aggregatedWords?wordsPerPage=${wpp}&filter=${filtResult}`;
  const rawResponse = await fetch(encodeURI(url), {
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
