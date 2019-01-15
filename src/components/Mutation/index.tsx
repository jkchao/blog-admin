import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { deleteCache } from '@/utils';

interface Props {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  children: (fn: MutationFn) => React.ReactNode;
}

export const MutationComponent = ({
  mutation,
  refetch,
  children,
  ItemName
}: Props) => {
  return (
    <Mutation
      mutation={mutation}
      update={cache => {
        deleteCache(cache, ItemName);
        refetch();
      }}
    >
      {(mutation, { loading, error }) => {
        return children(mutation);
      }}
    </Mutation>
  );
};
