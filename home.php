<!DOCTYPE html>
<html>
<style>
  <?php include 'CSS/main.css'; ?>
</style>

<body>
  <div class="content">
    <div id="register">
      <Label>
        Register
      </Label>
    </div>
    <h2>Business</h2>

    <form action="frontpage.php" method="POST">
      <li>
        <input id="username" name="username" type="email" class="input" placeholder="Enter Your Username" required>
      </li>
      <li>
        <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
      </li>
      <li>
        <button class="btn_login" type="click" name='submit' onclick="cambiar_login()">LOGIN</button>
      </li>
    </form>
  </div>
</body>

</html>