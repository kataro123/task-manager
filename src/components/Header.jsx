import PropTypes from 'prop-types';
import { useState } from 'react';

import { AddIcon, TrashIcon } from '../assets/icons/index';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

const Header = ({ subtitle, title }) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(!addTaskDialogIsOpen);
  };
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color="ghost">
          Limpar tarefas
          <TrashIcon />
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          Nova Tarefa
          <AddIcon />
        </Button>
      </div>
      <AddTaskDialog
        handleDialogClose={handleDialogClose}
        isOpen={addTaskDialogIsOpen}
      />
    </div>
  );
};

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
