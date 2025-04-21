<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php'; // Make sure this is included

$mail = new PHPMailer(true);

try {
    // Anti-spam and validation measures
    // 1. Check for honeypot field (add a hidden field to your form)
    if (!empty($_POST['website'])) { // Bots often fill hidden fields
        exit; // Silently exit
    }
    
    // 2. Verify the form was submitted via POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        exit('Invalid request method');
    }
    
    // 3. CSRF protection - add a token system to your form
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        exit('Invalid form submission');
    }
    
    // 4. Required fields validation
    $name = isset($_POST['name-ask']) ? $_POST['name-ask'] : '';
    $email = isset($_POST['email-ask']) ? $_POST['email-ask'] : '';
    $phone = isset($_POST['tel-ask']) ? $_POST['tel-ask'] : '';
    $message = isset($_POST['message-ask']) ? $_POST['message-ask'] : '';
    
    if (empty($name) || empty($email) || empty($message)) {
        echo '<div class="error_message">Please fill out all required fields.</div>';
        exit();
    }
    
    // 5. Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo '<div class="error_message">Please enter a valid email address.</div>';
        exit();
    }

    // 6. Simple message length check to prevent blank submissions
    if (strlen(trim($message)) < 5) {
        echo '<div class="error_message">Please enter a valid message.</div>';
        exit();
    }
    
    // Setup email
    $mail->setFrom('info@neucognition.com', 'Neucognition Website Form');
    $mail->addAddress('info@neucognition.com', 'Neucognition Info'); // Change to your target address
    $mail->addReplyTo($email, $name);
    $mail->isHTML();
    $mail->Subject = 'New Question from Neucognition Landing Page';
    
    // Create HTML content
    $e_content = "
    <html lang='en'>
    <head><title>New Website Inquiry</title></head>
    <body>
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Message:</strong><br/>$message</p>
    </body>
    </html>";
    
    $mail->Body = $e_content;
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message"; // Plain text version
    
    // reCAPTCHA verification
    $recaptcha_secret = '6LdO4x8rAAAAAAOH7VSgIZFdZ4qp1qb7Glc-GCWd';
    $recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $recaptcha_options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptcha_data)
        ]
    ];

    $recaptcha_context = stream_context_create($recaptcha_options);
    $recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
    $recaptcha_json = json_decode($recaptcha_result);

    if (!$recaptcha_json->success) {
        echo '<div class="error_message">reCAPTCHA verification failed. Please try again.</div>';
        exit();
    }
    
    $mail->send();
    
    // Success message
    echo '<div id="success_page">
            <div class="icon icon--order-success svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                    <g fill="none" stroke="#8EC343" stroke-width="2">
                        <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
                        <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0;"></path>
                    </g>
                </svg>
            </div>
            <h5>Thank you!<span> Your message has been sent successfully!</span></h5>
        </div>';
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: $mail->ErrorInfo";
}

try {
    // Anti-spam measures

    // Form validation
    $email_newsletter = isset($_POST['email_newsletter']) ? $_POST['email_newsletter'] : '';

    // Email validation
    if (empty($email_newsletter) || !filter_var($email_newsletter, FILTER_VALIDATE_EMAIL)) {
        echo '<div class="error_message">Please enter a valid email address.</div>';
        exit();
    }

    // Setup email
    $mail->setFrom('info@neucognition.com', 'Neucognition Newsletter');
    $mail->addAddress('info@neucognition.com', 'Neucognition Info');
    $mail->addReplyTo('noreply@neucognition.com', 'Neucognition Newsletter');
    $mail->isHTML();
    $mail->Subject = 'New Newsletter Subscription';

    // Email content
    $e_content = "<p>$email_newsletter would like to subscribe to the Neucognition newsletter</p>";
    $mail->Body = $e_content;
    $mail->send();

    // Confirmation/auto-reply email to subscriber
    $mail->ClearAddresses();
    $mail->addAddress($email_newsletter);
    $mail->Subject = 'Thank you for subscribing to Neucognition updates';
    $mail->Body = "<p>Thank you for subscribing to the Neucognition newsletter. We'll keep you updated about our site launch and future developments.</p>";
    $mail->Send();

    // Success message
    echo '<div id="success_page">
            <div class="icon icon--order-success svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                    <g fill="none" stroke="#8EC343" stroke-width="2">
                        <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
                        <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0;"></path>
                    </g>
                </svg>
            </div>
            <h5>Thank you!<span> You have been subscribed successfully!</span></h5>
        </div>';

} catch (Exception $e) {
    echo "Subscription could not be processed. Error: $mail->ErrorInfo";
}