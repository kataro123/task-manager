import { createPortal } from 'react-dom';

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* Dialog */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383e]">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9a9c9f]">
          Insira as informações abaixo
        </p>
      </div>
      {/* Dialog */}
    </div>,
    document.getElementById('root')
  );
};

export default AddTaskDialog;
