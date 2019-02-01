import React from 'react';
import { Mutation, OperationVariables, MutationFn } from 'react-apollo';
import { deleteCache } from '@/utils';
import { MutationProps } from './index.interface';

export const MutationComponent = <T extends {} = {}, V = OperationVariables>({
  mutation,
  refetch,
  children,
  ItemName,
  shouldDeleteCache = true
}: MutationProps<T, V>) => (
  <Mutation<T, V>
    mutation={mutation}
    update={cache => {
      shouldDeleteCache && deleteCache(cache, ItemName);
      shouldDeleteCache && refetch && refetch();
    }}
  >
    {(mutation, { loading }) => {
      return children(mutation, loading);
    }}
  </Mutation>
);
