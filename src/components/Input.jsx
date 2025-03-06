function Input(props) {
  return (
    <input
      type="text"
      className="input"
      value={props.inputValue}
      placeholder="Create your task"
      onChange={(e) => props.setInputValue(e.target.value)}
    />
  );
}

export default Input;
