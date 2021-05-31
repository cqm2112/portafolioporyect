<?
$name = $_POST{'name'};
$email = $_POST{'email'};
$message = $_POST['message'];

$email_message = "

Name: ".$name."
Email: ".$email."
Message: ".$message."

";

mail ("20187221@itla.edu.do" , "contact", $email_message);
header("location: ../mail-success.html ");
?>


