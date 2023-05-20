<?php
// Initialize the session
session_start();

// Check if the user is already logged in, if yes then redirect him to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
  header("location: frontpage.php");
  exit;
}

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'jmllcdata';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn)
  die('Could not connect: ' . mysqli_error($mysql));
?>

<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="CSS/main.css">
  <style>
    #content {
      top: 15vh;
      right: 35vw;
      left: 35vw;
      padding: 20px;
      width: 30vw;
      border-radius: 15px;
      box-shadow: 1px 1px 4px 1px #c8d8eb;
    }

    #register {
      position: absolute;
      right: 10px;
      top: 0;
      width: 15%;
      background: transparent;
    }

    #register-btn {
      border: 0;
      background: transparent;
      color: red;
    }

    #registerTab {
      display: none;
    }
  </style>
</head>

<script type="text/javascript">
  function registerTab() {
    if (document.querySelector('#header').textContent == "Business") {
      document.querySelector('#header').textContent = "Register Business";
      document.querySelector('#register-btn').innerHTML = "Login";
      document.querySelector('#registerTab').style.display = "block";
      document.querySelector('#login').style.display = "none";
    } else {
      document.querySelector('#header').textContent = "Business";
      document.querySelector('#register-btn').innerHTML = "Register";
      document.querySelector('#registerTab').style.display = "none";
      document.querySelector('#login').style.display = "block";
    }
  }

  function checkInfo() {
    testcname = document.getElementById('cname').value;
    testemail = document.getElementById('email').value;
    testusername = document.getElementById('username').value;

    $query = "SELECT*  from businesslogin where name='testcname' OR username='testusername' OR email='testemail'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
      alert("Could not register business as its name/username/email is already registered.");
      return false;
    }
    return true;
  }
  <?php
  if (!empty(isset($_POST['register_submit']))) {
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

    $sql = "INSERT INTO businesslogin (idnum,name,address,city,state,zipcode,country,phone,mobile,email,username,password,companycode) VALUES ('$idnum','$cname','$street','$city','$state','$zip','$country','$phone','$mobile','$email','$username','$password','$comcode')";
    if (!mysqli_query($conn, $sql)) {
      die('Error: ' . mysqli_error($conn));
    }
  }
  
  ?>
</script>

<body>
  <div class="main-content" id="content">
    <h2 id="header">Business</h2>
    <div id="register">
      <button id="register-btn" onclick="registerTab()">
        Register
      </button>
    </div>
    <form id="registerTab" action="" method="POST" onSubmit="return checkInfo();">
      <input id="idnun" name="idnum" type="text" class="input" placeholder="Enter Id Number" required>
      <input id="cname" name="cname" type="text" class="input" placeholder="Enter company Name" required>
      <input id="Street" name="street" type="text" class="input" placeholder="Enter Street" required>
      <input id="City" name="city" type="text" class="input" placeholder="Enter City" required>
      <input id="State" name="state" type="text" class="input" placeholder="Enter State" required>
      <input id="Zip" name="zip" type="text" pattern="[0-9]{5}" class="input" placeholder="Enter Zip Code" required>
      <input id="Country" name="country" type="text" class="input" placeholder="Enter Country" required>
      <input id="Phone" name="phone" type="text" class="input" placeholder="Enter Phone Number" required>
      <input id="Mobile" name="mobile" type="text" class="input" placeholder="Enter Mobile Number" required>
      <input id="email" name="email" type="text" class="input" placeholder="Enter Email" required>
      <input id="Username" name="username" type="text" class="input" placeholder="Enter Username" required>
      <input id="Password" name="password" type="text" class="input" placeholder="Enter Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
      <input id="ComCode" name="comcode" type="text" class="input" placeholder="Enter Company Code" required>
      <button class="btn_sign_up" name='register_submit'>REGISTER</button>
    </form>
    
    <form id="login" action="" method="POST1">
      <li>
        <input id="username" name="username" type="text" class="input" placeholder="Enter Your Username" required>
      </li>
      <li>
        <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
      </li>
      <li>
        <button class="btn_login" type="click" name='login_submit'>LOGIN</button>
      </li>
      <li>
        <Label id="message"> </Label>
      </li>
      <li>
        <a href="components\forgotInfoSection\businessFP.php">Forgot Username/Password</a>
      </li>
      <?php 
          if (isset($_POST1['login_submit'])) {
            $username = $_POST1['username'];
            $password = $_POST1['password'];
        
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'jmllcdata';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn)
  die('Could not connect: ' . mysqli_error($mysql));
  
            $query = "SELECT*  from businesslogin where username='$username' AND password='$password'";
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
              session_start();
        
              header("Location: frontpage.php");
              exit();
            } else {
              echo 'Incorrect';
            }
          }
        ?>
    </form>
  </div>
</body>

</html>