<?php
  echo '
    <img class="sign__close-img" src="images/close.svg" alt="Закрыть" />
    <img class="sign__image" src="/images/welcome.png" alt="welcome" />
    <h1 class="sign__title">Записаться на курс</h1>
    <form action="form_handler.php" method="POST">
      <input class="sign__form-input" placeholder="Ваше имя" type="text" name="first_name" />
      <input class="sign__form-input" placeholder="Email" type="text" name="email" />
      <select size="1" class="sign__form-select select" name="activity">
        <option value="" disabled selected>Деятельность</option>
        <option class="select__option" value="programmer">Программист</option>
        <option class="select__option" value="designer">Дизайнер</option>
        <option class="select__option" value="marketer">Маркетолог</option>
      </select>
      <br>
      <input class="sign__form-checkbox" type="checkbox" name="agreement" />
      <p class="sign__form-checkbox-desc">Согласен получать информационные материалы о старте курса</p>
      <div class="button form__btn-sign" onClick="javascript:this.parentNode.submit();">Записаться на курс</div>
    </form>
  ';