import React from 'react';
import { Mutation } from 'react-apollo';
import { Popconfirm } from 'antd';
import { LinksItem } from '.';

interface DeleteLinkProps {
  record: LinksItem;
  refetch: () => void;
  handleError: (message: string) => void;
  type: string;
}

export const DeleteLink = ({
  record,
  refetch,
  type,
  handleError
}: DeleteLinkProps) => (
  <Mutation
    mutation={type}
    update={cache => {
      // @ts-ignore
      Object.keys(cache.data.data).forEach(key => {
        // @ts-ignore
        key.match(/^DocsItem/) && cache.data.delete(key);
      });
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
          <a href="javascript:;">{loading ? 'loading' : 'delete'}</a>
        </Popconfirm>
      );
    }}
  </Mutation>
);
