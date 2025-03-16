import { useEffect, useState } from 'react';
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
  const [task, setTask] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
      reset({
        title: data?.title,
        time: data?.time,
        description: data?.description,
      });
    };

    fetchTask();
  }, [taskId, reset]);

  const handleTaskDelete = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task?.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setDeleteIsLoading(false);
      return;
    }

    setDeleteIsLoading(false);
    navigate('/');
  };

  const handleTaskSubmit = async (data) => {
    const dados = {
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
    };
    const response = await fetch(`http://localhost:3000/tasks/${task?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      toast.error('Nao foi possivel atualizar. Tente novamente.');
      return;
    }

    const newTask = await response.json();

    setTask(newTask);

    toast.success('Tarefa atualizada com sucesso!');
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
            disabled={deleteIsLoading}
          >
            <TrashIcon />
            {deleteIsLoading ? (
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
                disabled={deleteIsLoading}
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
                disabled={deleteIsLoading}
                {...register('time', { required: 'O Horário é obrigatório.' })}
                error={errors?.time}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                disabled={deleteIsLoading}
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
              disabled={deleteIsLoading}
            >
              Cancelar
            </Button>
            {/* Botao de salvar */}
            <Button
              size="large"
              color="primary"
              // onClick={handleTaskSubmit}
              type="submit"
              disabled={deleteIsLoading}
            >
              {isSubmitting ? (
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
