<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;
   use PHPMailer\PHPMailer\SMTP;

   require 'modules/PHPMailer/src/Exception.php';
   require 'modules/PHPMailer/src/PHPMailer.php';
   require 'modules/PHPMailer/src/SMTP.php';

   $mail = new PHPMailer(true);

   $mail->IsSMTP();
	 $mail->Host = "smtp.mail.ru";
	 $mail->SMTPAuth = true;
 	 $mail->Username = 'cezar9222@list.ru';
	 $mail->Password = 'c3e8z7a9r044mail';
	 $mail->SMTPSecure = 'ssl';
	 $mail->Port = 465;

   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'modules/phpmailer/language/');
   $mail->IsHTML(true);

   //от кого письмо
   $mail->setFrom('cezar9222@list.ru', 'Пётр Шон');
   //кому отправить
   $mail->addAddress('petershonpublic@gmail.com');
   //тема письма
   $mail->Subject = 'Письмо обратной связи';

   //тело письма
   $body = '<h1>Письмо от пользователя</h1>';

   //проверки на заполненность полей
   if(trim(!empty($_POST['name']))) {
      $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))) {
      $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['message']))) {
      $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
   }

   $mail->Body = $body;

   //обработчик отправки
   if (!$mail->send()) {
      $message = 'Ошибка';
   } else {
      $message = 'Данные отправлены!';
   }

   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
?>