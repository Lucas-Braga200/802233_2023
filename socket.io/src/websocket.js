import { io } from './http.js';

const users = new Array();
const messages = new Array();

function getMessagesFromChat(categoryChat) {
  const messagesFromChat = messages.filter(message => {
    return message.categoryChat === categoryChat;
  });

  return messagesFromChat;
}

io.on('connection', (socket) => {
  // Access Chat Room
  socket.on('accessRoom', (data, cb) => {
    socket.join(data.categoryChat);

    const userAlreadyConnected = users.find(user => {
      return user.username == data.username && user.categoryChat == data.categoryChat;
    });

    if (userAlreadyConnected) {
      userAlreadyConnected.socketId = socket.id;
    } else {
      users.push({
        ...data,
        socketId: socket.id,
      });
    }

    const messagesFromChat = getMessagesFromChat(data.categoryChat);

    // Return messages from chat to client-side;
    cb(messagesFromChat);
  });

  // Send message
  socket.on('message', data => {
    const message = {
      ...data,
      createdAt: new Date(),
    };
    messages.push(message);

    // Send message to other users.
    io.to(data.categoryChat).emit('message', message);
  });
});
