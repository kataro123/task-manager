import { createPortal } from 'react-dom';

import Button from './Button';
import Input from './Input';

const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* Dialog */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383e]">Nova Tarefa</h2>
        <p className="my mb-4 mt-1 text-sm text-[#9a9c9f]">
          Insira as informações abaixo
        </p>

        <div className="flex w-[336px] flex-col space-y-4">
          <Input
            label="Título"
            id="title"
            placeholder="Insira o título da tarefa"
          />
          <Input label="Horário" id="time" placeholder="Horário" />
          <Input
            label="Descrição"
            id="description"
            placeholder="Descreva a tarefa"
          />

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="large"
              className="w-full"
              onClick={handleDialogClose}
            >
              Cancelar
            </Button>
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
      {/* Dialog */}
    </div>,
    document.getElementById('root')
  );
};

export default AddTaskDialog;
