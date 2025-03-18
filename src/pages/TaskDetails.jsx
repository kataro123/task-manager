import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      const data = await response.json();
      reset({
        title: data?.title,
        time: data?.time,
        description: data?.description,
      });
      return data;
    },
  });

  const { mutate, isPending: updateTaskIsLoading } = useMutation({
    mutationKey: ['updateTask', task?.id],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data;
    },
  });

  const { mutate: deleteMutate, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ['deleteTask', task?.id],
    mutationFn: async () => {
      const taskTitle = task.title;
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      }

      const deletedTask = await response.json();

      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id);
      });

      return taskTitle;
    },
  });

  const handleTaskDelete = async () => {
    deleteMutate(undefined, {
      onSuccess: (taskTitle) => {
        navigate('/');
        toast.success(`A tarefa '${taskTitle}' foi deletada com sucesso!`);
      },
      onError: () => {
        toast.error('Houve um erro ao tentar deletar essa tarefa');
      },
    });
  };

  const handleTaskSubmit = async (data) => {
    const dados = {
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
    };

    mutate(dados, {
      onSuccess: (datas) => {
        queryClient.setQueryData(['task', taskId], () => {
          return dados;
        });

        queryClient.setQueryData(['tasks'], (oldTasks) => {
          return oldTasks?.map((oldTask) => {
            if (oldTask.id === taskId) {
              console.log(datas);
              return datas;
            }
            console.log(oldTask);
            return oldTask;
          });
        });

        // reset(dados);

        return toast.success('Tarefa atualizada com sucesso!');
      },
      onError: (err) => {
        console.log(err);
        return toast.error('Houve um erro ao tentar atualizar a tarefa!');
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          {/* Parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-primary text-white"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            color="danger"
            className="h-fit self-end"
            onClick={handleTaskDelete}
            disabled={deleteTaskIsLoading || updateTaskIsLoading}
          >
            <TrashIcon />
            {deleteTaskIsLoading ? (
              <LoaderIcon className="animate-spin text-brand-white" />
            ) : (
              'Deletar tarefa'
            )}
          </Button>
        </div>

        {/* Dados da tarefa */}
        <form onSubmit={handleSubmit(handleTaskSubmit)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                error={errors?.title}
              />
            </div>

            <div>
              <TimeSelect
                id="time"
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
                {...register('time', { required: 'O Horário é obrigatório.' })}
                error={errors?.time}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
                {...register('description', {
                  required: 'A Descrição é obrigatória.',
                })}
                error={errors?.description}
              />
            </div>
          </div>
          {/* Botoes em baixo */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="secondary"
              onClick={handleBackClick}
              disabled={deleteTaskIsLoading || updateTaskIsLoading}
            >
              Cancelar
            </Button>
            {/* Botao de salvar */}
            <Button
              size="large"
              color="primary"
              // onClick={handleTaskSubmit}
              type="submit"
              disabled={deleteTaskIsLoading || updateTaskIsLoading}
            >
              {updateTaskIsLoading ? (
                <LoaderIcon className="animate-spin text-brand-white" />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
