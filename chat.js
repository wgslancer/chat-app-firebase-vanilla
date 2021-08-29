const firebaseConfig = {
  apiKey: 'AIzaSyDKvglRMWjbOBF7mvUCLQR57twPzFBBu44',
  authDomain: 'chat-app-68d83.firebaseapp.com',
  projectId: 'chat-app-68d83',
  storageBucket: 'chat-app-68d83.appspot.com',
  messagingSenderId: '405215528692',
  appId: '1:405215528692:web:6d65108c19c95b86c200a1',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
function checkAuth() {
  const uid = localStorage.getItem('uid');
  if (!uid) {
    location.replace('/index.html');
  }
}

checkAuth();

function signout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem('uid');
      location.replace('/index.html');
    })
    .catch((error) => {
      console.log(error);
    });
}

const signoutBtn = document.getElementById('signout');
signoutBtn.addEventListener('click', signout);

function sendMessage() {
  event.preventDefault();
  const messageInput = document.getElementById('message');
  db.collection('messages')
    .add({
      value: messageInput.value,
      createdAt: new Date(),
      uid: localStorage.getItem('uid'),
    })
    .then(() => {
      messageInput.value = '';
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}

const sendBtn = document.getElementById('send');

sendBtn.addEventListener('click', sendMessage);
sendBtn.addEventListener('submit', sendMessage);

function createMessageCard(value, uid, createdAt) {
  const messageElement = document.createElement('span');
  messageElement.textContent = value;
  const createdAtElement = document.createElement('span');
  const date = new Date(createdAt.toDate());
  createdAtElement.textContent = ` ${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  const messageContainer = document.createElement('div');
  const uidInLocalstorage = localStorage.getItem('uid');
  const senderElement = document.createElement('p');
  if (uid === uidInLocalstorage) {
    senderElement.textContent = 'Tui';
  } else {
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        const { fullname } = doc.data();
        senderElement.textContent = fullname;
      });
  }
  messageContainer.appendChild(senderElement);
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(createdAtElement);
  return messageContainer;
}

function getMessageToDisplay() {
  const messagesContainer = document.getElementById('messages');
  db.collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot((querySnapshot) => {
      messagesContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const { value, createdAt, uid } = doc.data();
        const messageCard = createMessageCard(value, uid, createdAt);
        messagesContainer.appendChild(messageCard);
      });
    });
}
getMessageToDisplay();
