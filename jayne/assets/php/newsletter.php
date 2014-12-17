<?php
$email = $_POST['email'];
$to = "email@gmail.com";
$subject = "New user subscribed to our newsletter";
$headers = "From: " . $to . "\r\n";
$body = "New user subscription: " . $email;
$file = '../text-files/emails.txt';

if( filter_var($email, FILTER_VALIDATE_EMAIL) ){
	file_put_contents($file, $email . ';' . "\r\n", FILE_APPEND | LOCK_EX);
	if( mail($to, $subject, $body, $headers, "-f " . $to) ){
		$response = array('error' => false, 'msg' => 'Thank you for subscribing to our newsletter');
	}
} else {
	$response = array('error' => true, 'msg' => 'Please enter a valid email');
}
echo json_encode($response);