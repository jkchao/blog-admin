import React from 'react';
import { MutationComponent } from '@/components/Mutation';

interface Props {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  variables: {
    _id: string;
    state: 'FAIL' | 'SUCCESS';
  };
  text: string;
}

export const HerosMutations = ({
  text,
  variables,
  ...mutationsProps
}: Props) => (
  <MutationComponent {...mutationsProps}>
    {mutation => (
      <a href="javascript:;" onClick={() => mutation({ variables })}>
        {text}
      </a>
    )}
  </MutationComponent>
);
