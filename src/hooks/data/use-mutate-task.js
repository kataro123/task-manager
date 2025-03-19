import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error();
      }

      const createdTask = await response.json();

      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(['tasks'], (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });

      const tasks = await response.json();
      return tasks;
    },
  });
};

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      return await response.json();
    },
    onSuccess: (task) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== task.id);
      });
    },
  });
};
