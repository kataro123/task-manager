import { useEffect, useState } from 'react';
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
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    // Preciso pegar os dados da API
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });

      const tasksResponse = await response.json();

      setTasks(tasksResponse);

      // Após pegar os dados da API, atualizar o meu state "tasks"
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  const handleTaskDeleteClick = async (taskId) => {
    // chamar a API para deletar a tarefa

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao deletar a tarefa. Por favor, tente novamente'
      );
    }

    // Após chamar a api, vou atualizar o state!

    const newTask = tasks.filter((task) => task.id !== taskId);
    setTasks(newTask);
    toast.success('Tarefa deletada com sucesso!');
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      const stats = {
        not_started: 'in_progress',
        in_progress: 'done',
        done: 'not_started',
      };

      const statsToast = {
        not_started: 'Tarefa iniciada com sucesso!',
        in_progress: 'Tarefa finalizada com sucesso!',
        done: 'Tarefa resetada com sucesso!',
      };

      toast.success(statsToast[task.status]);

      return { ...task, status: stats[task.status] };
    });

    setTasks(newTasks);
  };

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(!addTaskDialogIsOpen);
  };

  const handleAddTask = async (task) => {
    // Chamar a API para adicionar essa tarefa
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor, tente novamente.'
      );
    }

    console.log(response);
    setTasks([...tasks, task]);
    toast.success('Tarefa adicionada com sucesso!');
    setAddTaskDialogIsOpen(false);
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
          {/* TAREFA DE MANHA */}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {/* TAREFA DE TARDE */}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {/* TAREFA DE NOITE */}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
      <AddTaskDialog
        handleDialogClose={handleDialogClose}
        isOpen={addTaskDialogIsOpen}
        handleSubmit={handleAddTask}
      />
    </div>
  );
}

export default Tasks;
