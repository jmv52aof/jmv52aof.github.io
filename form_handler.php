<?php
  header('Content-type: application/json');
  $email = strtolower($_POST['email']);
  if ($email === '') {
    $response = array('status' => 500, 'message' => 'Invalid email');
    echo json_encode($response);
    exit;
  }
  $name = $_POST['first_name'];
  if ($name === '') {
    $response = array('status' => 500, 'message' => 'Invalid name');
    echo json_encode($response);
    exit;
  }
  
  // DEBUG
  if ($name === 'ThrowError') {
    $response = array('status' => 500, 'message' => 'Error request');
    echo json_encode($response);
    exit;
  }
  // DEBUG END
  
  $activity = $_POST['activity'];
  if (!$activity) {
    $activity = 'Деятельность не указана';
  }
  
  // agreement не передаётся при значении off
  $agreement = isset($_POST['agreement']) ? 'Согласен получать рассылку' : 'Не согласен получать рассылку';
  
  $file = 'data/' . $email . '.txt';
  $content = $email . PHP_EOL
    . $name . PHP_EOL
    . $activity . PHP_EOL
    . $agreement . PHP_EOL;
  file_put_contents($file, $content);
  
  $response = array('status' => 200, 'message' => 'OK');
  echo json_encode($response);