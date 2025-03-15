import { useEffect, useRef, useState } from 'react';
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
  const [errors, setErrors] = useState([]);
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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
    };

    fetchTask();
  }, [taskId]);

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

  const handleTaskSubmit = async () => {
    setSaveIsLoading(true);

    const newErrors = [];

    if (!titleRef.current.value.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      });
    }

    if (!timeRef.current.value.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O Horário é obrigatório',
      });
    }

    if (!descriptionRef.current.value.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A Descrição é obrigatória',
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const dados = {
      id: task?.id,
      title: titleRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      time: timeRef.current.value.trim(),
      status: task?.status,
    };
    const response = await fetch(`http://localhost:3000/tasks/${task?.id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      setSaveIsLoading(false);
      toast.error('Nao foi possivel atualizar. Tente novamente.');
      return;
    }

    const newTask = await response.json();

    setTask(newTask);

    setSaveIsLoading(false);
    toast.success('Tarefa atualizada com sucesso!');
  };
  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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
            disabled={saveIsLoading || deleteIsLoading}
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
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              ref={titleRef}
              id="title"
              label="Título"
              defaultValue={task?.title}
              error={titleError}
              disabled={saveIsLoading || deleteIsLoading}
            />
          </div>

          <div>
            <TimeSelect
              ref={timeRef}
              id="time"
              defaultValue={task?.time}
              error={timeError}
              disabled={saveIsLoading || deleteIsLoading}
            />
          </div>

          <div>
            <Input
              ref={descriptionRef}
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              error={descriptionError}
              disabled={saveIsLoading || deleteIsLoading}
            />
          </div>
        </div>
        {/* Botoes em baixo */}
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="secondary"
            onClick={handleBackClick}
            disabled={saveIsLoading || deleteIsLoading}
          >
            Cancelar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleTaskSubmit}
            disabled={saveIsLoading || deleteIsLoading}
          >
            {saveIsLoading ? (
              <LoaderIcon className="animate-spin text-brand-white" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
