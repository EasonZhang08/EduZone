// const firebaseConfig = {
//     apiKey: "AIzaSyBSbM6mVe5LlrDK-Vbtf_c9JkScHN-26I8",
//     authDomain: "eduzone-b89a9.firebaseapp.com",
//     projectId: "eduzone-b89a9",
//     storageBucket: "eduzone-b89a9.appspot.com",
//     messagingSenderId: "129902676930",
//     appId: "1:129902676930:web:9c78e558386340b6b4a45b",
//     measurementId: "G-83DFJ7L9Q8"
// };

// firebase.initializeApp(firebaseConfig);

const signOutButton = document.getElementById('sign-out-button');

// Sign up a new user
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

// Sign in an existing user
firebase.auth().signInWithEmailAndPassword(email, password)
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });


document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    function sendMessage() {
        //get the input box
        const messageInput = document.getElementById('messageInput');
        //get the chat window
        const chatWindow = document.getElementById('chatWindow');
        
        //make sure it's not empty
        if (messageInput.value.trim() !== "") {
            //create the message div
            const message = document.createElement('div');
            message.classList.add('message', 'user');
            //add the message content
            message.textContent = messageInput.value;

            const placeholders = document.querySelectorAll('.placeholder');
            placeholders.forEach(placeholder => placeholder.remove());

            chatWindow.appendChild(message);
            // Clear the input
            messageInput.value = "";  
            // Scroll to the bottom
            chatWindow.scrollTop = chatWindow.scrollHeight;  
        }
    }

    sendButton.addEventListener('click', sendMessage);

    //triggers sendMessage when the user enters
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

});

function selectSection(section) {
    const sectionContent = document.getElementById('sectionContent');
    if (section === 'dm') {
        sectionContent.innerHTML = `
            <div class="item friends">Friend 1</div>
            <div class="item friends">Friend 2</div>
            <div class="item friends">Friend 3</div>
        `;
    } else {
        sectionContent.innerHTML = `
            <div class="item">Channel 1 in ${section}</div>
            <div class="item">Channel 2 in ${section}</div>
            <div class="item">Channel 3 in ${section}</div>
        `;
    }

}

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

