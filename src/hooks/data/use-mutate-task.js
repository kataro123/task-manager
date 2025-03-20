import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task);

      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data } = await api.delete(`/tasks/${taskId}`);

      return data;
    },
    onSuccess: (task) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== task.id);
      });
    },
  });
};

export const useGetTask = (taskId, reset) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data } = await api.get(`/tasks/${taskId}`);

      reset({
        title: data?.title,
        time: data?.time,
        description: data?.description,
      });
      return data;
    },
  });
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('/tasks');

      return tasks;
    },
  });
};

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (newTask) => {
      const { data } = await api.patch(`/tasks/${taskId}`, newTask);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks?.map((oldTask) => {
          if (oldTask.id === taskId) {
            return data;
          }
          return oldTask;
        });
      });
    },
  });
};
