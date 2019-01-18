import { MutationFn } from 'react-apollo';

export interface MutationProps {
  mutation: string;
  refetch: () => void;
  ItemName: RegExp;
  children: (fn: MutationFn, loading: boolean) => React.ReactNode;
}
