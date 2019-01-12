import { DataProxy } from 'apollo-cache';

// https://github.com/apollographql/apollo-feature-requests/issues/4#issuecomment-431119231
export const deleteCache = (cache: DataProxy, key: RegExp) => {
  // @ts-ignore
  Object.keys(cache.data.data).forEach(key => {
    // @ts-ignore
    key.match(key) && cache.data.delete(key);
  });
};
