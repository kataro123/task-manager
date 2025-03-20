import { useQueryClient } from '@tanstack/react-query';
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
import {
  useDeleteTask,
  useGetTask,
  useUpdateTask,
} from '../hooks/data/use-mutate-task';
import { taskQueryKeys } from '../keys/queries';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { data: task } = useGetTask(taskId, reset);

  const { mutate, isPending: updateTaskIsLoading } = useUpdateTask(taskId);

  const { mutate: deleteMutate, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const handleTaskDelete = async () => {
    deleteMutate(undefined, {
      onSuccess: (task) => {
        navigate('/tasks');
        toast.success(`A tarefa '${task.title}' foi deletada com sucesso!`);
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
      onSuccess: (task) => {
        queryClient.setQueryData(taskQueryKeys.getOne(task.id), () => {
          return task;
        });
        reset(dados);

        return toast.success(`Tarefa ${task.title} atualizada com sucesso!`);
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
