import React from 'react';
import { MutationComponent } from '@/components/Mutation';
import { ChangeStateMutationVariables } from './index.interface';

interface Props {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  variables: ChangeStateMutationVariables;
  text: string;
}

export const CommentsMutations = ({
  text,
  variables,
  ...mutationsProps
}: Props) => (
  <MutationComponent<{}, ChangeStateMutationVariables> {...mutationsProps}>
    {mutation => (
      <a href="javascript:;" onClick={() => mutation({ variables })}>
        {text}
      </a>
    )}
  </MutationComponent>
);
