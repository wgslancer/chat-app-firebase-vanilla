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
  localStorage.removeItem('uid');
  location.replace('/index.html');
}

const signoutBtn = document.getElementById('signout');
signoutBtn.addEventListener('click', signout);
