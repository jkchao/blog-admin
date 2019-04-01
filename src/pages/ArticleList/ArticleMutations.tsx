import React from 'react';
import { MutationComponent } from '@/components/Mutation';
import { State, Publish } from './index.interface';

interface Variables {
  _id: string;
  state?: State;
  publish?: Publish;
}

interface Props {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  variables: Variables;
  text: string;
}

export const ArticleMutations = ({
  text,
  variables,
  ...mutationsProps
}: Props) => (
  <MutationComponent<{}, Variables> {...mutationsProps}>
    {mutation => (
      <a href="javascript:;" onClick={() => mutation({ variables })}>
        {text}
      </a>
    )}
  </MutationComponent>
);
