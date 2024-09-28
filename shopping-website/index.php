<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./asset/styles/app.css">
    <link rel="stylesheet" href="./asset/styles/index.css">
    <title>sign in</title>
</head>
<body>
    <form action="" class="form">
        <h2 class="form__title">Sign In</h2>
        <div class="form__firstname">
            <input type="text" name="firstname" placeholder="Firstname" require>
        </div>
        <div class="form__lastname">
            <input type="text" name="lastname" placeholder="Lastname" require>
        </div>
        <div class="form__email">
            <input type="email" name="email" placeholder="Email" require>
        </div>
        <div class="form__phone">
            <input type="text" name="phone" placeholder="Phone Number" require>
        </div>
        <div class="form__password">
            <input type="password" name="password" placeholder="Password" require>
        </div>
        <button class="form__submit">submit</button>
    </form>
</body>
</html>