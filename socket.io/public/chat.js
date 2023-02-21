// Variables
let socket;

let username;
let categoryChat;

let messageInput;
let sendButton;
let containerMessages;
let containerTitleLoading;
let containerTitle;

let categories = {
  biology: 'Biologia',
  philosophy: 'Filosofia',
  sociology: 'Sociologia',
  software: 'Programação'
};

// General functions
function getParams() {
  const urlSearch = new URLSearchParams(window.location.search);
  username = urlSearch.get('io__username');
  categoryChat = urlSearch.get('io__category-chat');
}

function getDOMElements() {
  messageInput = document.querySelector('#io__chat-input');
  sendButton = document.querySelector('#io__send-button');
  containerMessages = document.querySelector('#io__container-messages');
  containerTitleLoading = document.querySelector('#io__room-title-loading');
  containerTitle = document.querySelector('#io__room-title');
}

function getMessageFromChat() {
  socket.on('message', data => {
    containerMessages.innerHTML += `
      <div>
        <label>
          <span>${data.username}</span><span>${data.createdAt}</span>
          ${data.message}
        </label>
      </div>
    `;
  });
}

function onLoadPage() {
  containerTitle.innerText = categories[categoryChat] || '';

  containerTitleLoading.classList.add('d-none');
  containerTitle.classList.remove('d-none');
}

// Events
function handleSendButtonEvent() {
  const clickEvent = function () {
    const message = messageInput.value;

    const data = {
      categoryChat,
      message,
      username
    };

    socket.emit('message', data);

    messageInput.value = '';
  };

  sendButton.addEventListener('click', clickEvent);
}

function handleMessageInputEvent() {
  const keypressEvent = function (e) {
    if (e.keyCode == 13) {
      const message = messageInput.value;

      const data = {
        categoryChat,
        message,
        username
      };

      socket.emit('message', data);

      messageInput.value = '';
    }
  };

  messageInput.addEventListener('keypress', keypressEvent);
}

// Init Function
function init() {
  socket = io();

  getDOMElements();
  getParams();
  getMessageFromChat();

  onLoadPage();

  handleSendButtonEvent();
  handleMessageInputEvent();

  socket.emit('accessRoom', { username, categoryChat }, response => {
    response.forEach(message => {
      containerMessages.innerHTML += `
        <div>
          <label>
            <span>${message.username}</span><span>${message.createdAt}</span>
            ${message.message}
          </label>
        </div>
      `;
    });
  });
}

init();
