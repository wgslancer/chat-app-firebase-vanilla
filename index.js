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
function login() {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('uid', user.uid);
      // ...
      location.replace('/chat.html');
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

const loginBtn = document.getElementById('login');

loginBtn.addEventListener('click', login);
loginBtn.addEventListener('submit', login);

function checkAuth() {
  const uid = localStorage.getItem('uid');
  if (uid) {
    location.replace('/chat.html');
  }
}

checkAuth();

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
}

const googleBtn = document.getElementById('google');
googleBtn.addEventListener('click', loginWithGoogle);
