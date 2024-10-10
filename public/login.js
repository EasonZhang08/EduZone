const firebaseConfig = {
  apiKey: "AIzaSyBSbM6mVe5LlrDK-Vbtf_c9JkScHN-26I8",
  authDomain: "eduzone-b89a9.firebaseapp.com",
  projectId: "eduzone-b89a9",
  storageBucket: "eduzone-b89a9.appspot.com",
  messagingSenderId: "129902676930",
  appId: "1:129902676930:web:9c78e558386340b6b4a45b",
  measurementId: "G-83DFJ7L9Q8"
};

firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      return true; // Return true to redirect to signInSuccessUrl.
    },
    uiShown: function() {
      // The widget is rendered.
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html', // URL to redirect to after sign-in
  signInOptions: [
    // Enable Email/Password sign-in method
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // Add other providers as needed
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Disable account chooser
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Terms of service url
  tosUrl: 'terms_of_service.html',
  // Privacy policy url
  privacyPolicyUrl: 'privacy_policy.html'
};


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

