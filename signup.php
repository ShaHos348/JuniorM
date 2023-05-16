<!DOCTYPE html>
<html>
<head>
<style>
@import "http://fonts.googleapis.com/css?family=Droid+Serif";  /* This Line is to import Google font style */
.content{
width:960px;
margin:20px auto
}
body, html {
  margin:0;
  color:#40E0D0;
  //background:#DDA0DD;
  font:600 16px/18px 'Open Sans',sans-serif;
   background-image: url("IMAGES/81k3.jpg");
   background-color: #DCDCDC; /* Used if the image is unavailable */
 
  background-position: right center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
 //background-size: auto;
  background-size: 550px 700px;
  //border: 25px double red;
 
}

.main{
	background:#FFFFF0;
	//background-image: url("IMAGES/81k3.jpg");
float:left;
width:650px;
margin-top:20px
}
#progressbar{
margin:0;
padding:0;
font-size:18px
}
#active1{
color:red
}
fieldset{
	background:url(http://codinginfinite.com/demo/images/bg.jpg) no-repeat center;
display:none;
width:350px;
padding:20px;
margin-top:50px;
margin-left:140px;
border-radius:5px;
box-shadow:3px 3px 25px 1px gray
}
#first{
	
display:block;
width:350px;
padding:20px;
margin-top:50px;
border-radius:5px;
margin-left:140px;
box-shadow:3px 3px 25px 1px gray

}
input[type=text],input[type=password],select{
width:100%;
margin:10px 0;
height:40px;
padding:5px;
border:3px solid #ecb0dc;
border-radius:4px
}
textarea{
width:100%;
margin:10px 0;
height:70px;
padding:5px;
border:3px solid #ecb0dc;
border-radius:4px
}
input[type=submit],input[type=button]{
width:120px;
margin:15px 25px;
padding:5px;
height:40px;
background-color:#a0522d;
border:none;
border-radius:4px;
color:#fff;
font-family:'Droid Serif',serif
}
h2,p{
text-align:center;
font-family:'Droid Serif',serif
}
li{
margin-right:52px;
display:inline;
color:#c1c5cc;
font-family:'Droid Serif',serif
}
p.ex1 {
  margin-left: 30px;
}
</style>

<!DOCTYPE html>
<html>
<head>
<title>Create your account</title>
<meta content="noindex, nofollow" name="robots">
<!-- Including CSS File Here -->

<!-- Including JS File Here -->

</head>

<body>

<div class="content">

<!-- Multistep Form -->
<div class="main">

<?php 

if(isset($_POST['submit2'])) {
    
	$username = $_POST['username'];
	$password = $_POST['password1'];
	$password2 = $_POST['password2'];
	
	
		

$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysql_error());

	$sql = "INSERT INTO client (username,password,password2) VALUES ('$username','$password','$password2')"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }

}

?>		


<form action="#" class="regform" method="POST">
<!-- Progressbar -->

 
<!-- Fieldsets -->
<fieldset id="first">
<h2 class="title">Create your account</h2>

<label for="Company"><b>Company Name</b></label>
    <input type="text" placeholder="Company Name" name="company" required>

    <label for="Street"><b>Street</b></label>
    <input type="text" placeholder="Enter Street" name="street" required>
	
    <label for="city"><b>city</b></label>
    <input type="text" placeholder="Enter city" name="city" required>

    <label for="state"><b>state</b></label>
    <input type="text" placeholder="Enter state" name="state" required>
	<label for="zip"><b>zip code</b></label>
    <input type="text" placeholder="Enter zip code" name="zip" required>

    <label for="Phone"><b>Phone number</b></label>
    <input type="text" placeholder="Enter Phone number" name="phone" required>
	<input class="submit_btn" onclick="validation(event)" type="submit" value="Submit" name='submit'>
    
</fieldset>
 <?php 

if(isset($_POST['submit'])) {
    
	$company = $_POST['company'];
	$street = $_POST['street'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$zip = $_POST['zip'];
	$phone = $_POST['phone'];
	
		

$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysql_error());

	$sql1 = "UPDATE client SET  company='$company',street='$street',city='$city',state='$state',company='$company',zip='$zip',phone='$phone',email=client.username WHERE (client.company='')"; 
    if(!mysqli_query($conn, $sql1)) {
        die('Error: ' . mysqli_error($conn));
    }
	
}

?>	

</form>
</div>
</div>

</body>
</html>