import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from './../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

function Tasks() {
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });

      const tasks = await response.json();
      return tasks;
    },
  });

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  const handleTaskCheckboxClick = async (uTask) => {
    const stats = {
      not_started: 'in_progress',
      in_progress: 'done',
      done: 'not_started',
    };

    const response = await fetch(`http://localhost:3000/tasks/${uTask.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: stats[uTask.status] }),
    });

    if (!response.ok) {
      return;
    }

    const newTasks = tasks?.map((task) => {
      if (task.id !== uTask.id) {
        return task;
      }

      const statsToast = {
        not_started: 'Tarefa iniciada com sucesso!',
        in_progress: 'Tarefa finalizada com sucesso!',
        done: 'Tarefa resetada com sucesso!',
      };

      toast.success(statsToast[task.status]);
      return { ...task, status: stats[task.status] };
    });

    queryClient.setQueryData(['tasks'], newTasks);
  };

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(!addTaskDialogIsOpen);
  };

  return (
    <div className="w-full space-y-16 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(!addTaskDialogIsOpen)}>
            Nova Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}

          {/* TAREFA DE MANHA */}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}

          {/* TAREFA DE TARDE */}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />

          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}

          {/* TAREFA DE NOITE */}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
      <AddTaskDialog
        handleDialogClose={handleDialogClose}
        isOpen={addTaskDialogIsOpen}
      />
    </div>
  );
}

export default Tasks;
