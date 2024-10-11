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

// Get elements
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
  e.preventDefault();
  signUpContainer.style.display = 'none';
  signInContainer.style.display = 'block';
  errorMessage.textContent = '';
});

linkToSignUp.addEventListener('click', (e) => {
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
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  // Password validation
  if (!isValidPassword(password)) {
    errorMessage.textContent = 'Password must be at least 6 characters.';
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Send verification email
      userCredential.user.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox.');
          // Optionally redirect or prompt user to verify email
          // window.location.href = 'index.html'; // Adjust if needed
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
  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Check if email is verified
      if (userCredential.user.emailVerified) {
        // Sign-in successful.
        console.log('User signed in:', userCredential.user);
        window.location.href = 'index.html'; // Adjust the path if necessary
      } else {
        errorMessage.textContent = 'Please verify your email before signing in.';
        // Sign out the user
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      // Handle Errors here.
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
  const email = prompt('Please enter your email address:');
  if (email) {
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

// Monitor authentication state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log('User is signed in:', user);

    // Hide sign-in and sign-up forms
    signInContainer.style.display = 'none';
    signUpContainer.style.display = 'none';

    // Show authenticated user message and options
    authMessage.style.display = 'block';
  } else {
    // No user is signed in.
    console.log('No user is signed in.');

    // Hide authenticated user message
    authMessage.style.display = 'none';

    // Show the sign-in form by default
    signInContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
  }
});

// Continue Button
continueButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Adjust the path if necessary
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
