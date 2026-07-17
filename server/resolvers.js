export const resolvers = {
  Query: {
    job: () => ({
      id: 'test-id',
      title: 'Software Engineer',
      description: 'We are looking for a Software Engineer.',
    }),
  },
};
