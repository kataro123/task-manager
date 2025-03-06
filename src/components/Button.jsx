function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      Add Task
    </button>
  );
}

export default Button;
