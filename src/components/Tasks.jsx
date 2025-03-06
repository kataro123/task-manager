import { useState } from 'react';
import Header from './Header';
import Input from './Input';
import Button from './Button';

function Tasks() {
  const [inputValue, setInputValue] = useState();

  const [messages, setMessages] = useState([
    'Hello World',
    'FSC is the best course in the world',
  ]);

  function handleButtonClick() {
    console.log('Button Clicked');
    setMessages([...messages, inputValue]);
    setInputValue('');
  }

  return (
    <div>
      <Header>
        <h1>Add a Task</h1>
      </Header>
      <Input inputValue={inputValue} setInputValue={setInputValue} />
      <Button onClick={handleButtonClick} />

      <Header>
        <h1>My Tasks</h1>
      </Header>

      <div>
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
