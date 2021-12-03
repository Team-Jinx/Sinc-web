const deleteCheerPF = (storyId: string) => `
    mutation {
      removeUsersCheeredPerformances(id:"${storyId}") 
    }
`;

const deleteQueries = {
  deleteCheerPF,
};

export default deleteQueries;
