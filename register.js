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
function registerNewUser() {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
      localStorage.setItem('uid', user.uid);
      db.collection('users')
        .doc(user.uid)
        .set({
          fullname: 'New user',
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        })
        .then(() => {
          location.replace('/index.html');
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
}

const registerBtn = document.getElementById('register');

registerBtn.addEventListener('click', registerNewUser);
registerBtn.addEventListener('submit', registerNewUser);
