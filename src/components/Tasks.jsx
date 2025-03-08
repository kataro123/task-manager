import Button from './Button';
import AddIcon from './../assets/icons/Add.svg?react';
import TrashIcon from './../assets/icons/trash.svg?react';
import SunIcon from './../assets/icons/sun.svg?react';
import CloudSunIcon from './../assets/icons/cloud-sun.svg?react';
import MoonIcon from './../assets/icons/moon.svg?react';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
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
        <div className="">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
        </div>

        <div className="my-6">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
        </div>

        <div className="">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
