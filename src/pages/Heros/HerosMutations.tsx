import React from 'react';
import { MutationComponent } from '@/components/Mutation';

interface Variables {
  _id: string;
  state: 'FAIL' | 'SUCCESS';
}

interface Props {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  variables: Variables;
  text: string;
}

export const HerosMutations = ({
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
