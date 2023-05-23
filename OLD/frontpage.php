<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: home.php");
    exit;
}
?>

<!DOCTYPE html>
<html>

<head>

</head>

<body>
  <div class="content">
    <h2>Hello, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b></h2>
    <a href="logout.php">Log Out</a>
    <marquee behavior="alternate">WELL COME TO STORE MANAGEMENT SYSTEM</marquee>
    <table>
      <tr>
        <td>
          <h2>Employee</h2>
          <li1>clock In/Out</li1>
          <a href="components/employeeSection/clockin-out.php"><img class="mySlides" src="images/employee1.jpg" style="width:80%" height="80"></a></p>
          <li1>Massage</li1>
          <a href="components/employeeSection/emessage.php"><img class="mySlides" src="images/employee2.jpg" style="width:80%" height="80"></a>
        </td>
        <td>
          <h2>Shift</h2>
          <a href="components/shiftSection/shiftcount.php">Shift count</a>
          <a href="components/shiftSection/shiftreport.php">shift report</a>
        <td>
          <h2>Lotto</h2>
          <li1><a href="components/lottoSection/lottoactive.php">Lotto ACt.</a></li1>
          <li1><a href="components/lottoSection/lottosale.php">Lotto Sale</a></li1>
        </td>
        <td>
          <h2>Report</h2>
          <li1><a href="components/reportSection/workreport.php">Work Sheet Report.</a></li1>
          <li1><a href="components/reportSection/preport.php">Pay Chack</a></li1>
        </td>
      </tr>
      <p></p>
      <tr>
        <td>
          <h2>Order</h2>
          <li1><a href="components/orderSection/inventory.php">Order List of Inventory.</a></li1>
        </td>
        <td>
          <h2>Vender</h2>
          <li1><a href="components/venderSection/company.php">Vender</a></li1>
        </td>
        <td>
          <form action="" method="POST">
            <div class="cont_form_login">
              <h2>Maneger</h2>
              <input id="username" name="username" type="email" class="input" placeholder="Enter Your Username" required>
              <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
              <button class="btn_login" type="submit" name='submit' onclick="cambiar_login()">LOGIN</button>
            </div>
            <?php
            if (isset($_POST['submit'])) {
              $username = $_POST['username'];
              $password = $_POST['password'];

              $dbhost = 'localhost';
              $dbuser = 'root';
              $dbpass = '';
              $dbname = 'jmllcdata';
              $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
              if (!$conn)
                die('Could not connect: ' . mysqli_error($mysql));
              $query = "SELECT*  from client where username='$username' and password='$password'";
              $result = mysqli_query($conn, $query);
              if (mysqli_num_rows($result) > 0) {
                header("Location: managerSection/manager.php");
                //echo "Query  return any result";

              } else {

                echo "Query didn't return any result";
              }
            }
            ?>
          </form>
        </td>
        <td>
          <h2>Contact Us</h2>
          <p>Some text..</p>
        </td>
      </tr>
    </table>
    <marquee bgcolor="pink">copy right sawda system inc</marquee>
  </div>

</body>

</html>