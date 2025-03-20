import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteTask, useUpdateTask } from '../hooks/data/use-mutate-task';
import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from './../assets/icons';
import Button from './Button';

const TaskItem = ({ task }) => {
  const { mutate, isPending } = useDeleteTask(task.id);
  const { mutate: updateTaskMutate } = useUpdateTask(task.id);

  const onDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: (task) => {
        toast.success(`A tarefa ${task.title} foi deletada com sucesso!`);
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!');
      },
    });
  };

  const handleTaskCheckboxClick = async (uTask) => {
    const stats = {
      not_started: 'in_progress',
      in_progress: 'done',
      done: 'not_started',
    };

    updateTaskMutate(
      { status: stats[uTask.status] },
      {
        onSuccess: () => {
          const statsToast = {
            not_started: 'Tarefa iniciada com sucesso!',
            in_progress: 'Tarefa finalizada com sucesso!',
            done: 'Tarefa resetada com sucesso!',
          };

          return toast.success(statsToast[task.status]);
        },
        onError: (err) => {
          throw new Error(err);
        },
      }
    );
  };

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary';
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process';
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue';
    }
  };
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckboxClick(task)}
          />
          {task.status === 'done' && <CheckIcon className="text-white" />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={() => onDeleteClick(task.id)}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray text-opacity-40 transition hover:text-opacity-60" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon className="text-black text-opacity-40 transition hover:text-opacity-60" />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
};

export default TaskItem;
