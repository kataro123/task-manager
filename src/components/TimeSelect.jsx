import InputLabel from './InputLabel';

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border-2 border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.error && (
        <p className="text-left text-xs text-red-500">{props.error.message}</p>
      )}
    </div>
  );
};

export default TimeSelect;
