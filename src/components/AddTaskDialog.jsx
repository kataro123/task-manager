import './AddTaskDialog.css';

import { useRef } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleDialogClose, handleSubmit }) => {
  const [title, setTitle] = useState();
  const [time, setTime] = useState('morning');
  const [description, setDescription] = useState();

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title: title,
      time: time,
      description: description,
      status: 'not_started',
    });

    handleDialogClose();

    setTitle(null);
    setTime('morning');
    setDescription(null);
  };

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* Dialog */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383e]">
                Nova Tarefa
              </h2>
              <p className="my mb-4 mt-1 text-sm text-[#9a9c9f]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TimeSelect
                  onChange={(event) => setTime(event.target.value)}
                  value={time}
                />
                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
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
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
            {/* Dialog */}
          </div>,
          document.getElementById('root')
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
