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
    addMessageToChat(data);
  });
}

function onLoadPage() {
  containerTitle.innerText = categories[categoryChat] || '';

  containerTitleLoading.classList.add('d-none');
  containerTitle.classList.remove('d-none');
}

function addMessageToChat(data) {
  if (data.username == username) {
    containerMessages.innerHTML += `
      <div class="d-flex justify-content-end w-100 mt-3">
        <div class="message-item bg-primary d-inline-block">
          <div class="pt-3 ps-3 pe-3 pb-1">
            <span class="text-white fs-6">
            ${data.message}
            </span>
          </div>
          <div class="w-100 text-white fw-light text-end pb-1 pe-1" style="font-size: 0.75rem">
            ${moment(data.createdAt).locale('pt-BR').format('LLL')}
          </div>
        </div>
      </div>
    `;
  } else {
    containerMessages.innerHTML += `
      <div class="d-flex justify-content-start w-100 mt-3">
        <div class="message-item bg-white d-inline-block">
          <div class="w-100 text-primary fw-bold fs-6 ps-3 pe-3 pt-3">${data.username}</div>
          <div class="ps-3 pe-3 pb-1">
            <span class="text-muted fs-6">
              ${data.message}
            </span>
          </div>
          <div class="w-100 text-black-50 fw-light text-end pb-1 pe-1" style="font-size: 0.75rem">
            ${moment(data.createdAt).locale('pt-BR').format('LLL')}
          </div>
        </div>
      </div>
    `;
  }
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
  moment.locale('pt-BR');

  socket = io();

  getDOMElements();
  getParams();
  getMessageFromChat();

  onLoadPage();

  handleSendButtonEvent();
  handleMessageInputEvent();

  socket.emit('accessRoom', { username, categoryChat }, response => {
    response.forEach(message => {
      addMessageToChat(message);
    });
  });
}

init();
