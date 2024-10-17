// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSbM6mVe5LlrDK-Vbtf_c9JkScHN-26I8",
  authDomain: "eduzone-b89a9.firebaseapp.com",
  projectId: "eduzone-b89a9",
  storageBucket: "eduzone-b89a9.appspot.com",
  messagingSenderId: "129902676930",
  appId: "1:129902676930:web:9c78e558386340b6b4a45b",
  measurementId: "G-83DFJ7L9Q8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements from html
const signUpContainer = document.getElementById('sign-up-container');
const signInContainer = document.getElementById('sign-in-container');
const linkToSignIn = document.getElementById('link-to-sign-in');
const linkToSignUp = document.getElementById('link-to-sign-up');
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');
const errorMessage = document.getElementById('error-message');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const authMessage = document.getElementById('auth-message');
const continueButton = document.getElementById('continue-button');
const signOutButton = document.getElementById('sign-out-button');

// Toggle between sign-up and sign-in forms
linkToSignIn.addEventListener('click', (e) => {
  //prevent default for submission behaviour
  e.preventDefault(); 
  //hidden sign up form
  signUpContainer.style.display = 'none';
  //show sign in form
  signInContainer.style.display = 'block';
  errorMessage.textContent = '';
});

linkToSignUp.addEventListener('click', (e) => {
  //same as the other one
  e.preventDefault();
  signInContainer.style.display = 'none';
  signUpContainer.style.display = 'block';
  errorMessage.textContent = '';
});

// Password validation function
function isValidPassword(password) {
  // At least 6 characters (Firebase's minimum)
  return password.length >= 6;
}

// Handle Sign-Up
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get input from the text field
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  // Password validation
  //must be at least 6 characters
  if (!isValidPassword(password)) {
    errorMessage.textContent = 'Password must be at least 6 characters.';
    return;
  }

  //use the firebase function to create a new user
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Send verification email
      //TODO check if this actually works
      userCredential.user.sendEmailVerification()
        .then(() => {
          //send a notification
          alert('Verification email sent. Please check your inbox.');
          errorMessage.textContent = "";
        });
    })
    .catch((error) => {
      // Handle Errors here.
      console.error('Error signing up:', error.message);
      errorMessage.textContent = error.message;
    });
});

// Handle Sign-In
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //same thing as the other one
  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Check if email is verified
      if (userCredential.user.emailVerified) {
        // Sign-in successful.
        console.log('User signed in:', userCredential.user);
        window.location.href = 'index.html'; 
      } else {
        //TODO this might not be working yet
        errorMessage.textContent = 'Please verify your email before signing in.';
        // Sign out the user
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      //handle errors
      console.error('Error signing in:', error.message);
      if (error.code === 'auth/user-not-found') {
        errorMessage.textContent = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage.textContent = 'Incorrect password.';
      } else {
        errorMessage.textContent = error.message;
      }
    });
});

// Handle Forgot Password
forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  //TODO use an actual html page instead of a prompt
  const email = prompt('Please enter your email address:');
  if (email) {
    //send the automatic password reset email
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
        errorMessage.textContent = error.message;
      });
  }
});

//this runs when the user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    //close the sign in and sign up page
    signInContainer.style.display = 'none';
    signUpContainer.style.display = 'none';

    //show the auth message
    authMessage.style.display = 'block';
  } else {
    // No user is signed in.
    console.log('No user is signed in.');


    authMessage.style.display = 'none';

    signInContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
  }
});

// Continue Button
continueButton.addEventListener('click', () => {
  window.location.href = 'index.html'; 
});

// Sign-Out Button
signOutButton.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    console.log('User signed out.');

    // Show the sign-in form
    authMessage.style.display = 'none';
    signInContainer.style.display = 'block';
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});
