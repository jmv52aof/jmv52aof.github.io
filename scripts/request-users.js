const button = document.getElementsByClassName('users__btn-get-data')[0];
button.addEventListener('click', () => {
  // Check if content already loaded
  if (button.getAttribute('disabled')) {
    return;
  }
  button.setAttribute('disabled', true);
  requestUsers();
});

async function requestUsers() {  
  const response = await fetch('get_users_handler.php');
  const result = await response.json();
  
  if (result.length === 0) {
    const newUserText = document.createElement('p');
    newUserText.innerHTML = 'Сохраненных пользователей нет';
    document.getElementsByClassName('users')[0].appendChild(newUserText);
  }

  for (userdata of result) {
    const newUser = document.createElement('div');

    const newUserText = document.createElement('p');
    newUserText.innerHTML = userdata.replaceAll('\n', '<br>');
    const newUserIcon = document.createElement('img');
    newUserIcon.src = 'images/user.png';

    newUser.appendChild(newUserIcon);
    newUser.appendChild(newUserText);
    newUser.classList.add('users__userdata');

    document.getElementsByClassName('users')[0].appendChild(newUser);
  }
}