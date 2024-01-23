const OpenAI = require("openai");

const userInput = document.getElementById('userInput');
const chatLog = document.getElementsByClassName("chatLog");
let apiKey;
let openai;

function createBot() {
    openai = new OpenAI({ 
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });
    console.log("API_KEY: " + openai.apiKey);
    console.log("Bot Created Successfully");
}

function askForApiKey() {
    apiKey = prompt('Enter your OpenAI API Key:');

    if (!apiKey) {
        alert('API Key is required. Please try again.');
        askForApiKey(); // Ask again if the user didn't provide an API key
        return;
    }
    console.log("API Key updated: " + apiKey);
    createBot();
    console.log("Bot Created Successfully: " + openai)
}

async function sendMessage() {
    const message = userInput.value;

    // Check if the API key is available
    if (!apiKey) {
        askForApiKey(); // If not, ask for the API key
        return;
    }

    // Create a chat message element
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('user-message');
    chatMessage.textContent = `You: ${message}`;

    // Update this line to correctly reference the chatLog element
    const chatLog = document.querySelector('.chatLog');
    
    // Append user's message to chat log
    chatLog.appendChild(chatMessage);

    // Send message to OpenAI API
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],
    });

    // Get the bot's reply
    const botReply = response.choices[0]?.message?.content || "";

    // Create a bot message element
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = `Bot: ${botReply}`;

    // Append bot's message to chat log
    chatLog.appendChild(botMessage);

    console.log("Message sent:", message);
}




// Move askForApiKey() to the end of the file
askForApiKey();

// Add event listener for the input box
userInput.addEventListener('keydown', function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      sendMessage();
      userInput.value = ''; // Clear the input box after sending the message
    }
  });
  
  // Add event listener for the button
  document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.querySelector('button');
    sendButton.addEventListener('click', function () {
      sendMessage();
      userInput.value = ''; // Clear the input box after sending the message
    });
  });