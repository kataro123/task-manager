export const taskMutationKeys = {
  add: () => ['addTask'],
  update: (taskId) => ['updateTask', taskId],
  delete: (taskId) => ['deleteTask', taskId],
  clear: () => ['clearTask'],
};
