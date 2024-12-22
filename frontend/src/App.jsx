// import { useState } from 'react';
// import ChatWindow from './components/ChatWindow';
// import MessageInput from './components/MessageInput';

// function App(){

//   const [messages, setMessages] = useState([]);

//   const sendMessage = async (userMessage) => {
    
//     const newMessage = { type: 'user', text: userMessage };
//     setMessages((prev) => [...prev, newMessage]);
  
//     try{
      
//       const response = await fetch('http://localhost:8000/api/chat/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userMessage }),
//       });
  
//       const data = await response.json();
  
//       if(response.ok && data.success)
//         setMessages((prev) => [...prev, { type: 'bot', text: data.reply }]);
       
      
//       else 
//         setMessages((prev) => [...prev, { type: 'bot', text: 'Something went wrong. Please try again.' }]);
      

//     } 
    
//     catch(error){
//       setMessages((prev) => [...prev, { type: 'bot', text: 'Error connecting to server. Please try later.' }]);
//     }

//   };
  

//   return (
//     <div className='form'>
//       <div className='messages'>
//         <ChatWindow messages={messages} />
//       </div>
//       <MessageInput onSendMessage={sendMessage} />
//     </div>
//   );

// }

// export default App;




import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import Login from './components/Login';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null); // Store the user token

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages'));
    if (savedMessages) {
      setMessages(savedMessages);
    }

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token);
    }
  }, []);

  const sendMessage = async (userMessage) => {
    const newMessage = { type: 'user', text: userMessage };
    setMessages((prev) => [...prev, newMessage]);
  
    try {
      const response = await fetch('http://localhost:3500/base/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Send the token in the headers
        },
        body: JSON.stringify({ userMessage }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        const botReply = data.reply;
        setMessages((prev) => {
          const updatedMessages = [...prev, { type: 'bot', text: botReply }];
          localStorage.setItem('messages', JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      } else {
        setMessages((prev) => {
          const updatedMessages = [
            ...prev,
            { type: 'bot', text: 'Something went wrong. Please try again.' },
          ];
          localStorage.setItem('messages', JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      }
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [
          ...prev,
          { type: 'bot', text: 'Error connecting to server. Please try later.' },
        ];
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    }
  };
  

  const handleLogin = (token) => {
    setUserToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token); // Save the token in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('messages');
  };

  return (
    <div className='form'>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className='messages'>
            <ChatWindow messages={messages} />
          </div>
          <MessageInput onSendMessage={sendMessage} />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
