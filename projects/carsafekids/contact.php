<?php
/**
 * Send email 
 *
 * @since 1.0.0
 */

if(strtoupper($_SERVER['REQUEST_METHOD']) == 'POST') {
	$success = false;
	$has_error = false;
	$has_errors = ['captcha' => false];
	$errors = [];

	$name = isset($_POST['name']) ? $_POST['name'] : '';
	$email = isset($_POST['email']) ? $_POST['email'] : '';
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	$message = isset($_POST['message']) ? $_POST['message'] : '';

	if(empty($name)) {
		$errors['name'] = 'Name is required.';
		$has_errors['name'] = true;
	} else {
		$has_errors['name'] = false;
	}

	if(empty($email)) {
		$errors['email'] = 'Email is required.';
		$has_errors['email'] = true;
	} else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = 'Email is invalid.';
		$has_errors['email'] = true;
	} else {
		$has_errors['email'] = false;
	}

	if(empty($message)) {
		$errors['message'] = 'Message is required.';
		$has_errors['message'] = true;
	} else {
		$has_errors['message'] = false;
	}

	$phonePattern = '/^[0-9\-\(\)\/\+\s]*$/';
	if(!empty($phone) && !preg_match($phonePattern, $phone)) {
		$errors['phone'] = 'Phone is invalid.';
		$has_error['phone'] = true;
	} else {
		$has_errors['phone'] = false;
	}

	if($has_errors['name'] || $has_errors['email'] || $has_errors['phone'] || $has_errors['message']) {
		$has_error = true;
	} else {
		$has_error = false;
	}

	if(!$has_error) {
		// CHANGE THE DESTINATION EMAIL ADDRESS.
		$to = 'nobody@example.com'; 
		$subject = "Enquiry from $name";
		$headers = "From: $email" . "\r\n" .
		    "Reply-To: $email" . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();

		$message = "$message \r\n \r\n $name \r\n $phone";

		$success = mail($to, $subject, $message, $headers);
	}

	echo json_encode(['hasError' => $has_error, 'hasErrors' => $has_errors, 'errors' => $errors, 'success' => $success]);

}