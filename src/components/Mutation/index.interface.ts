import { MutationFn, OperationVariables } from 'react-apollo';

export interface MutationProps<T = any, V = OperationVariables> {
  mutation: string;
  ItemName: RegExp;
  refetch?: () => void;
  shouldDeleteCache?: boolean;
  children: (fn: MutationFn<T, V>, loading: boolean) => React.ReactNode;
}
