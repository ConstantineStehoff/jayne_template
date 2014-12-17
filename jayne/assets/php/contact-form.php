<?php
$to = "email@gmail.com";
$from = "email@gmail.com";
$subject = "New user subscribed to our newsletter";
$file = '../text-files/contact-forms.txt';

$headers = "From: " . $from . "\r\n";
$requiredFields = array(
	'Name' => filter_var($_POST['contactName'], FILTER_SANITIZE_STRING),
	'Email' => filter_var($_POST['contactEmail'], FILTER_SANITIZE_EMAIL),
	'Message' => filter_var($_POST['contactMsg'], FILTER_SANITIZE_STRING)
);
$errors = array();
$err_num = 0;
$success = false; 

foreach($requiredFields as $key => $value){
	if($value == ''){
		$new_input[$key] = array('missing-error' => true);
		$errors[$key] = $new_input[$key];
		$err_num += 1;
	} elseif($key == 'Email'){
		if( !filter_var($value, FILTER_VALIDATE_EMAIL) ){
			$errors['Email'] = array('missing-error' => false, 'validEmail-error' => true);
			$err_num += 1;
		} else {
			$errors['Email'] = array('missing-error' => false, 'validEmail-error' => false);
		}	
	} else{
		$errors[$key] = array('missing-error' => false);
	}
}
if($requiredFields['Name'] !== '' 
	&& $requiredFields['Email'] !== '' 
	&& $requiredFields['Message'] !== '' 
	&&  $err_num == 0){
	$body = "New contact form: " 
		. "\r\n\r\n"
		. "Name: " . $requiredFields['Name']
		. "\r\n" 
		. "Email: " . $requiredFields['Email']
		. "\r\n"
		. "Message: "
		. "\r\n\r\n"
		. $requiredFields['Message']
		. "\r\n\r\n"
		. "\r\n\r\n";
	file_put_contents($file, $body, FILE_APPEND | LOCK_EX);
	if( mail($to, $subject, $body, $headers, "-f " . $to) ){
		$success = true;
	}	
}
$data = array();
$data['errors'] = $errors;
$data['success'] = $success;
echo json_encode($data);