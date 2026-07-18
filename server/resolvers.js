import { createJob, getJob, getJobs, getJobsByCompany } from './db/jobs.js';
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
    createJob: (_root, { input: { title, description } }) => {
      const companyId = 'FjcJCHJALA4i'; // TODO set based on user
      return createJob({ companyId, title, description });
    },
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
const toIsoDate = (value) => value.split('T')[0];
