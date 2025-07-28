const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (parsedData.email) form.elements.email.value = parsedData.email;
    if (parsedData.message) form.elements.message.value = parsedData.message;
  } catch (error) {
    console.error('❌ Failed to parse data from storage :', error);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim(); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', { email, message });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
