<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Don't do it</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<?php
  echo '
    <form action="get_userdata_handler.php" method="POST">
      <input class="sign__form-input userdata-input" placeholder="Email" type="text" name="email" />
      <div class="button form__btn-sign userdata-input" onClick="javascript:this.parentNode.submit();">Получить данные</div>
    </form>
  ';
?>
</body>