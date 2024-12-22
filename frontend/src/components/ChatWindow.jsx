import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages }) => (
  <>
    {messages.map((msg, index) => (
      <MessageBubble key={index} type={msg.type} text={msg.text} />
    ))}
  </>
);

export default ChatWindow;