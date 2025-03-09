import Button from './Button';
import TasksSeparator from './TasksSeparator';
import TASK from './../constants/tasks';
import TaskItem from './TaskItem';
import AddIcon from './../assets/icons/Add.svg?react';
import TrashIcon from './../assets/icons/trash.svg?react';
import SunIcon from './../assets/icons/sun.svg?react';
import CloudSunIcon from './../assets/icons/cloud-sun.svg?react';
import MoonIcon from './../assets/icons/moon.svg?react';
import { useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState(TASK);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  const handleTaskDeleteClick = (taskId) => {
    console.log('teste');
    const newTask = tasks.filter((task) => task.id !== taskId);
    setTasks(newTask);
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

      return { ...task, status: stats[task.status] };
    });

    setTasks(newTasks);
  };

  return (
    <div className="w-full space-y-16 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button>
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
    </div>
  );
};

export default Tasks;
