const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1 text-[#9a9c9f]">
      {icon}
      <p className="text-sm">{title}</p>{' '}
    </div>
  );
};

export default TasksSeparator;
