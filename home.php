<!DOCTYPE html>
<html>
<script type="text/javascript">
  function registerTab() {
    if (document.querySelector('#header').textContent == "Business") {
      document.querySelector('#header').textContent = "Register Business";
      document.querySelector('#register-btn').innerHTML = "Back";
      document.querySelector('#registerTab').style.display = "block";
      document.querySelector('#login').style.display = "none";
    } else {
      document.querySelector('#header').textContent = "Business";
      document.querySelector('#register-btn').innerHTML = "Register";
      document.querySelector('#registerTab').style.display = "none";
      document.querySelector('#login').style.display = "block";
    }
  }
</script>
<style>
  <?php include 'CSS/main.css'; ?>
</style>

<body>
  <div class="content">
    <h2 id="header">Business</h2>
    <div id="register">
      <button id="register-btn" onclick="registerTab()">
        Register
      </button>
    </div>
    <form id="registerTab" action="" method="POST">
      <input id="idnun" name="idnum" type="text" class="input" placeholder="Enter Id Number" required>
      <input id="cname" name="cname" type="text" class="input" placeholder="Enter company Name" required>
      <input id="Street" name="street" type="text" class="input" placeholder="Enter Street" required>
      <input id="City" name="city" type="text" class="input" placeholder="Enter City" required>
      <input id="State" name="state" type="text" class="input" placeholder="Enter State" required>
      <input id="Zip" name="zip" type="text" class="input" placeholder="Enter Zip Code" required>
      <input id="Country" name="country" type="text" class="input" placeholder="Enter Country" required>
      <input id="Phone" name="phone" type="text" class="input" placeholder="Enter Phone Number" required>
      <input id="Mobile" name="mobile" type="text" class="input" placeholder="Enter Mobile Number" required>
      <input id="email" name="email" type="text" class="input" placeholder="Enter Email" required>
      <input id="Username" name="username" type="text" class="input" placeholder="Enter Username" required>
      <input id="Password" name="password" type="text" class="input" placeholder="Enter Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
      <input id="ComCode" name="comcode" type="text" class="input" placeholder="Enter Company Code" required>
      <button class="btn_sign_up" name='register_submit'>Submit</button>
    </form>
    <form id="login" action="" method="POST">
      <li>
        <input id="username" name="username" type="text" class="input" placeholder="Enter Your Username" required>
      </li>
      <li>
        <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
      </li>
      <li>
        <button class="btn_login" type="click" name='login_submit'>LOGIN</button>
      </li>
    </form>
  </div>
</body>

<?php
if (isset($_POST['register_submit'])) {
  $idnum = $_POST['idnum'];
  $cname = $_POST['cname'];
  $street = $_POST['street'];
  $city  = $_POST['city'];
  $state  = $_POST['state'];
  $zip = $_POST['zip'];
  $country = $_POST['country'];
  $phone = $_POST['phone'];
  $mobile = $_POST['mobile'];
  $email = $_POST['email'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  $comcode = $_POST['comcode'];

  define('DB_NAME', 'jmllcdata');
  define('DB_USER', 'root');
  define('DB_PASSWORD', '');
  define('DB_HOST', 'localhost');

  // stored in a variable to TEST if it's working
  $link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  $query = "SELECT*  from businesslogin where name='$cname' OR username='$username' OR email='$email'";
  $result = mysqli_query($link, $query);
  if (mysqli_num_rows($result) > 0) {
    echo '<script>alert("Could not register business as its name/username/email is already registered.")</script>';
  } else {
    $sql = "INSERT INTO businesslogin (idnum,name,address,city,state,zipcode,country,phone,mobile,email,username,password,companycode) VALUES ('$idnum','$cname','$street','$city','$state','$zip','$country','$phone','$mobile','$email','$username','$password','$comcode')";
    if (!mysqli_query($link, $sql)) {
      die('Error: ' . mysqli_error($link));
    }
  }
}

if (isset($_POST['login_submit'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $dbhost = 'localhost';
  $dbuser = 'root';
  $dbpass = '';
  $dbname = 'jmllcdata';
  $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
  if (!$conn)
    die('Could not connect: ' . mysqli_error($mysql));
  $query = "SELECT*  from businesslogin where username='$username' and password='$password'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
    header("Location: frontpage.php");
    //echo "Query  return any result";

  } else {

    echo "Query didn't return any result";
  }
}
?>

</html>