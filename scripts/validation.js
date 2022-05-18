const inputFields = document.getElementsByClassName('sign__form-input');
const fieldName = inputFields[0];
const fieldEmail = inputFields[1];

const nameExpression = new RegExp('^[A-Za-zА-Яа-я \-]+$');
const emailExpression = new RegExp('^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,}$');

function isValid() {
  let isCheckFailed = false;
  fieldEmail.classList.remove('input-error');
  if (!emailExpression.test(fieldEmail.value)) {
    fieldEmail.classList.add('input-error');
    isCheckFailed = true;
  }
  fieldName.classList.remove('input-error');
  if (!nameExpression.test(fieldName.value)) {
    fieldName.classList.add('input-error');
    isCheckFailed = true;
  }
  
  return !isCheckFailed;
}

function processForm() {
  if (!isValid()) {
    return;
  }

  if (submitForm() == 500) {
    const popupForm = document.getElementsByClassName('sign')[0];
    const closeImg = document.getElementsByClassName('sign__close-img')[0];
    const errorText = document.createElement('p');
    errorText.classList.add('popup-error-desc');
    errorText.textContent = 'Упс.. Произошла ошибка!';
    popupForm.innerHTML = '';
    popupForm.appendChild(closeImg);
    popupForm.appendChild(errorText);
  } else {
    closeForm();
  }
}

async function submitForm() {
  const formData = new FormData();
  formData.append(
    'email',
    document.getElementsByClassName('sign__form-input')[1].value
  )
  formData.append(
    'first_name',
    document.getElementsByClassName('sign__form-input')[0].value
  )
  formData.append(
    'activity',
    document.getElementsByClassName('sign__form-select')[0].value
  )

  const response = await fetch('form_handler.php', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();

  return result.status;
}
