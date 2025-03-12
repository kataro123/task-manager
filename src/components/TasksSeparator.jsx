const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-border pb-1 text-brand-text-gray">
      {icon}
      <p className="text-sm">{title}</p>{' '}
    </div>
  );
};

export default TasksSeparator;
