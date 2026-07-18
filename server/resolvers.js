import { getJob, getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: (root, { id }) => getJob(id),
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};
const toIsoDate = (value) => value.split('T')[0];
