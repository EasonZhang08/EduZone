document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.getElementById('chatWindow');


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
