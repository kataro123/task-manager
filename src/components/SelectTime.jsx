import InputLabel from './InputLabel';

const SelectTime = () => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border-2 border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
};

export default SelectTime;
