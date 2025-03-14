import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleDialogClose, onSubmitSuccess }) => {
  const [errors, setErrors] = useState([]);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const nodeRef = useRef(null);
  const titleRef = useRef(null);
  const timeRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setErrors([]);
    }
  }, [isOpen]);

  const handleSaveClick = async () => {
    setSubmitIsLoading(true);
    const newErrors = [];
    if (!titleRef.current.value.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      });
    }

    if (!timeRef.current.value.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      });
    }

    if (!descriptionRef.current.value.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatório.',
      });
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      setSubmitIsLoading(false);
      return;
    }

    const dados = {
      id: v4(),
      title: titleRef.current.value.trim(),
      time: timeRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      status: 'not_started',
    };

    // Chamar a API para adicionar essa tarefa
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      setSubmitIsLoading(false);
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor, tente novamente.'
      );
    }

    onSubmitSuccess(dados);

    setErrors([]);

    setSubmitIsLoading(false);
    handleDialogClose();
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="my mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Insira o título da tarefa"
                  error={titleError}
                  ref={titleRef}
                />
                <TimeSelect error={timeError} ref={timeRef} />
                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                  error={descriptionError}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    color="secondary"
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
                    disabled={submitIsLoading}
                  >
                    {submitIsLoading ? (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    ) : (
                      'Salvar'
                    )}
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddTaskDialog;
