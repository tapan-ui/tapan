<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? 'Portfolio Inquiry';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // SMTP settings (Gmail example)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tapanrajyaguru007@gmail.com';
        $mail->Password   = '123#';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Sender & receiver
        $mail->setFrom('tapanrajyaguru007@gmail.com', 'Portfolio Contact');
        $mail->addAddress('tapanrajyaguru007@gmail.com');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
            <h3>New Inquiry</h3>
            <b>Name:</b> $name <br>
            <b>Email:</b> $email <br>
            <b>Message:</b><br>$message
        ";

        $mail->send();
        echo "<script>alert('Message sent successfully!'); window.history.back();</script>";

    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>