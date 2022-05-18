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
  echo '<ul class="userdata-text">';
  $email = $_POST['email'];
  if ($email === '') {
    echo 'ОШИБКА: Email не может быть пустым';
    exit;
  }
  echo '<li>';
  $file = 'data/' . $email . '.txt';
  if (!file_exists($file)) {
    echo 'ОШИБКА: Email ещё не записан';
    exit;
  }
  $content = file_get_contents('data/' . $email . '.txt');
  $content = str_replace("\n", '</li><li>', $content);
  echo $content;
  echo '</li>';
  echo '</ul>';
?>
</body>