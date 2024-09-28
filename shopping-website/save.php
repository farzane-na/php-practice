<?php
    $shopDB= mysqli_connect("localhost", "root", "", "my_shop");
    $tokenLength = 16;

    if (!$shopDB) {
        exit("Connection Problem");
    }
    if (isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST["password"])) {
        $firstname=$_POST["firstname"];
        $lastname=$_POST["lastname"];
        $email=$_POST["email"];
        $phone=$_POST["phone"];
        $password=$_POST["password"];
        $token = bin2hex(random_bytes($tokenLength));
    
        $SQL = "INSERT INTO users(firstname, lastname, email, phone , password,token) VALUES('$firstname', '$lastname', '$email', '$phone','$password','$token)";
        if (mysqli_query($database, $SQL)) {
            header("Location: shop.php?token=" . $token);
            exit();
        }else{
            echo "Error: ". mysqli_error($shopDB);
        }
    }
?>