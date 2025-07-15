const apiKeyInput = document.getElementById('api-key-input');
const gameSelect = document.getElementById('game-select');
const questionInput = document.getElementById('question-input');
const askButton = document.getElementById('ask-button');
const form = document.getElementById('form');
const aiResponse = document.getElementById('ai-response');

const submitForm = async (event) => {
  event.preventDefault();
  console.log('Form submitted', event);
}

form.addEventListener('submit', submitForm);