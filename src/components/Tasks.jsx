import Button from './Button';
import AddIcon from './../assets/icons/Add.svg?react';
import TrashIcon from './../assets/icons/trash.svg?react';
import SunIcon from './../assets/icons/sun.svg?react';
import CloudSunIcon from './../assets/icons/cloud-sun.svg?react';
import MoonIcon from './../assets/icons/moon.svg?react';

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
        {/* MANHÃ */}

        {/* SE DER PROBLEMA DE MARGIN OU PADDING- ADICIONAR CLASSE SPACE-Y-3 NAS 3 DIVS */}

        <div className="">
          <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1 text-[#9a9c9f]">
            <SunIcon />
            <p className="text-sm">Manhã</p>{' '}
          </div>
        </div>

        {/* MANHÃ */}

        {/* TARDE */}
        <div className="my-6">
          <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1 text-[#9a9c9f]">
            <CloudSunIcon />
            <p className="text-sm">Tarde</p>{' '}
          </div>
        </div>
        {/* TARDE */}

        {/* NOITE */}
        <div className="">
          <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1 text-[#9a9c9f]">
            <MoonIcon />
            <p className="text-sm">Noite</p>{' '}
          </div>
        </div>
        {/* NOITE */}
      </div>
    </div>
  );
};

export default Tasks;
