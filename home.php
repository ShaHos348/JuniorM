<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{
	background-color:gray;
}

.content {
  max-width: 1000px;
  margin: auto;
  background: white;
  padding: 10px;
}

* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 25%;
  padding: 10px;
  height: 250px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>


</head>
<body>


<h2>KEITH BRIDGE FOOD MART</h2>


<div class="content">


<div class="row">
  <div class="column" style="background-color:#aaa;">
    <h2>Employee</h2>
	<li1>clock In/Out</li1>
	<a href="clockin-out.php"><img class="mySlides" src="images/employee1.jpg" style="width:80%" height="80"></a></p>
	<li1>Massage</li1>
	<a href="emassage.php"><img class="mySlides" src="images/employee2.jpg" style="width:80%" height="80" ></a>
	
  </div>
  <div class="column" style="background-color:#bbb;">
    <h2>Shift</h2>
<script>
// Automatic Slideshow - change image every 3 seconds
var myIndex = 0;
carouse2();

function carouse2() {
  var i;
  var x = document.getElementsByClassName("mySlides2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carouse2, 3000);
}
</script>
	<a href="shiftcount.php">Sht</a>
	<a href="shiftreport.php">srt</a>
   

    
  </div>
    <div class="column" style="background-color:#ccc;">
    <h2>Lotto</h2>
    <li1><a href="lottoactive.php">Lotto ACt.</a></li1>
		<li1><a href="lottosale.php">Lotto Sale</a></li1>
  </div>
  <div class="column" style="background-color:#aaa;">
    <h2>Report</h2>
    <li1><a href="workreport.php">Work Sheet Report.</a></li1>
			<li1><a href="preport.php">Pay Chack</a></li1>
  </div>
</div>
<p><marquee behavior="alternate">WELL COME TO STORE MANAGEMENT SYSTEM</marquee></p>

<div class="row">
  <div class="column" style="background-color:#aaa;">
    <h2>Order</h2>
	
   <li1><a href="inventory.php">Order List of Inventory.</a></li1>
	
  </div>
  <div class="column" style="background-color:#bbb;">
    <h2>Vender</h2>
    <li1><a href="company.php">Vender</a></li1>
  </div>
    <div class="column" style="background-color:#ccc;">
	
    <form  action="" method="POST">
       
 <div class="cont_form_login">


   <h2>Maneger</h2>
   
 <input id="username" name="username"  type="email" class="input" placeholder="Enter Your Username" required>
 <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>



<button class="btn_login"  type="submit" name='submit' onclick="cambiar_login()">LOGIN</button>
  </div>
   <?php 

if(isset($_POST['submit'])) {
    
	$username = $_POST['username'];
	$password = $_POST['password'];
	
$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysql_error());

	$query="SELECT*  from client where username='$username' and password='$password'";
	$result =mysqli_query($conn,$query );
	
	if (mysqli_num_rows($result) > 0) {

header("Location: maneger.php");
//echo "Query  return any result";

} else {

echo "Query didn't return any result";

}

	}
?>	
      </form>
</div>

  <div class="column" style="background-color:#aaa;">
    <h2>Contact Us</h2>
    <p>Some text..</p>
  </div>
</div>

</div>

<marquee bgcolor="pink">copy right sawda system inc</marquee>


</body>
</html>
