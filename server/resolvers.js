import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    company: async (root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`Company not found: ${id}`);
      }
      return company;
    },
  },
  Mutation: {
    createJob: (_root, { input: { title, description } }, { auth }) => {
      if (!auth) {
        throw unauthorizedError('Missing authentication');
      }
      const companyId = 'FjcJCHJALA4i'; // TODO set based on user
      return createJob({ companyId, title, description });
    },
    updateJob: (_root, { input: { id, title, description } }) => {
      return updateJob({ id, title, description });
    },
    deleteJob: (_root, { id }) => deleteJob(id),
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};
function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}
function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
}
const toIsoDate = (value) => value.split('T')[0];
