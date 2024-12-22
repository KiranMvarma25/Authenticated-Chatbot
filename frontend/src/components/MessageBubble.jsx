const MessageBubble = ({ type, text }) => {

    const userStyle = {
      backgroundColor: '#4299e1',
      color: 'white',
      textAlign: 'left',
      padding: '10px 15px',
      borderRadius: '20px',
      maxWidth: '75%',
      wordWrap: 'break-word', 
      overflowWrap: 'break-word', 
      margin: '10px 0',
    };
  
    const botStyle = {
      backgroundColor: '#e2e8f0',
      color: 'black',
      textAlign: 'right',
      padding: '10px 15px',
      borderRadius: '20px',
      maxWidth: '75%',
      wordWrap: 'break-word', 
      overflowWrap: 'break-word', 
      margin: '10px 0 10px auto',
    };
  
    return (
      <p style={type === 'user' ? botStyle : userStyle}>{text}</p>
    );
};
  
export default MessageBubble;