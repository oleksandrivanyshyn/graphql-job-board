import { companyByIdQuery } from './queries.js';
import { useQuery } from '@apollo/client/react';

export function useCompany(id) {
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id },
  });
  return { company: data?.company, loading, error: Boolean(error) };
}
