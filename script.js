const apiKeyInput = document.getElementById('api-key-input');
const gameSelect = document.getElementById('game-select');
const questionInput = document.getElementById('question-input');
const askButton = document.getElementById('ask-button');
const form = document.getElementById('form');
const aiResponse = document.getElementById('ai-response');


const askAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `I have the game ${game} and I want to know ${question}`;

  const contents = [{
    parts: [{
      text: prompt
    }]
  }];

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contents})
  })

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

const submitForm = async (event) => {
  event.preventDefault();
  console.log('Form submitted', event);

  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (apiKey == '' || game == '' || question == '') {
    alert('Please fill in all fields.');
    return;
  }

  askButton.disabled = true;
  askButton.textContent = 'Asking...';
  askButton.classList.add('loading');

  try {
    const aiRespose = await askAI(question, game, apiKey);
  } catch (error) {
    console.log('Error requesting AI:', error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = 'Ask';
    askButton.classList.remove('loading');
  }
}

form.addEventListener('submit', submitForm);