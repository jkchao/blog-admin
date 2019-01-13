import { Popconfirm } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';

import { deleteCache } from '@/utils';

import { LinksItem } from './link.interface';

interface DeleteLinkProps {
  record: LinksItem;
  refetch: () => void;
  handleError: (message: string) => void;
  mutation: string;
}

export const DeleteLink = ({
  record,
  refetch,
  mutation,
  handleError
}: DeleteLinkProps) => (
  <Mutation
    mutation={mutation}
    update={cache => {
      deleteCache(cache, /^LinksItem/);
      refetch();
    }}
  >
    {(deleteLink, { loading, error }) => {
      error && handleError(error.message);
      return (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() =>
            deleteLink({
              variables: { _id: record._id }
            })
          }
        >
          <a href="javascript:;">delete</a>
        </Popconfirm>
      );
    }}
  </Mutation>
);
