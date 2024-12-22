import { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
        className='Input'
      />
      <button className='Button' type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
