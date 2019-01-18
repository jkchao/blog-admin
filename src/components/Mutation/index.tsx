import React from 'react';
import { Mutation } from 'react-apollo';
import { deleteCache } from '@/utils';
import { MutationProps } from './index.interface';

// 需要 deleteCache 的 mutation

export const MutationComponent = ({
  mutation,
  refetch,
  children,
  ItemName
}: MutationProps) => {
  return (
    <Mutation
      mutation={mutation}
      update={cache => {
        deleteCache(cache, ItemName);
        refetch();
      }}
    >
      {(mutation, { loading }) => {
        return children(mutation, loading);
      }}
    </Mutation>
  );
};
