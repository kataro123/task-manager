import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleDialogClose, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  });

  const nodeRef = useRef(null);

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
    handleDialogClose();
  };

  const handleSaveClick = async (data) => {
    const dados = {
      id: v4(),
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
      status: 'not_started',
    };

    // Chamar a API para adicionar essa tarefa
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor, tente novamente.'
      );
    }

    onSubmitSuccess(dados);

    reset({
      title: '',
      time: 'morning',
      description: '',
    });

    handleDialogClose();
  };
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

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  label="Título"
                  id="title"
                  placeholder="Insira o título da tarefa"
                  disabled={isSubmitting}
                  error={errors?.title}
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode estar vazio.';
                      }
                      return true;
                    },
                  })}
                />
                <TimeSelect
                  disabled={isSubmitting}
                  error={errors?.time}
                  {...register('time', {
                    required: 'O horário é obrigatório.',
                  })}
                />
                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  error={errors?.description}
                  {...register('description', {
                    required: 'A descrição é obrigatória.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode estar vazia.';
                      }
                      return true;
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    size="large"
                    className="w-full"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
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
