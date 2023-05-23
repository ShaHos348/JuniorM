<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{
	//background: #555;
	background-color:gray;
//color:#111111;
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
  width: 50%;
  padding: 10px;
  height: 425px; /* Should be removed. Only for demonstration */
}

/* Create two equal columns that floats next to each other */
.column1 {
  float: left;
  width: 50%;
  padding: 10px;
  height: 450px; /* Should be removed. Only for demonstration */
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
 	
   <form  action="" method="POST">
 <p>Pay out: Vendor/Parson</p>		
			<p><input id="Company1" name="company1" type="text" class="input" placeholder="Vendor/Parson ">
            <input id="Amount1" name="amount1" type="text" class="input" placeholder="Amount">
            <p><input id="Company2" name="company2" type="text" class="input" placeholder="Vendor/Parson Name">
			<input id="Amount2" name="amount2" type="text" class="input" placeholder="Amount">
			<p><input id="Company3" name="company3" type="text" class="input" placeholder="Vendor/Parson Name">
			<input id="Amount3" name="amount3" type="text" class="input" placeholder="Amount">
			<p><input id="Company4" name="company4" type="text" class="input" placeholder="Vendor/Parson Name">
			<input id="Amount4" name="amount4" type="text" class="input" placeholder="Amount">
			<p><input id="Company5" name="company5" type="text" class="input" placeholder="Vendor/Parson Name">
			<input id="Amount5" name="amount5" type="text" class="input" placeholder="Amount">
			<p><input id="Company6" name="company6" type="text" class="input" placeholder="Company Name">
			<input id="Amount6" name="amount6" type="text" class="input" placeholder="Amount">
	<p>Pay Roll</p>		
			<p><input id="employee1" name="employee1" type="text" class="input" placeholder="Employee Name">
			<input id="payroll1" name="apayroll1" type="text" class="input" placeholder="Amount">
			<p><input id="employee2" name="employee2" type="text" class="input" placeholder="Employee Name">
			<input id="payroll2" name="payroll2" type="text" class="input" placeholder="Amount">
			<p><input id="employee3" name="employee3" type="text" class="input" placeholder="Employee Name">
			<input id="payroll3" name="payroll4" type="text" class="input" placeholder="Amount">
			<p><input id="employee4" name="employee4" type="text" class="input" placeholder="Employee Name">
			<input id="payroll5" name="payroll5" type="text" class="input" placeholder="Amount">
			



<button class="btn_login"  type="submit" name='submit2' onclick="cambiar_login()">Submit</button></p>

 
  <?php 
if(isset($_POST['submit2'])) {
	//$dat=$_POST['date'];
	$company1 = $_POST['company1'];
	$company2 = $_POST['company2'];
	$company3 =$_POST['company3'];
	$company4= $_POST['company4'];
	$company5= $_POST['company5'];
	$company6= $_POST['company6'];
	
	$amount1 = $_POST['amount1'];
	$amount2 = $_POST['amount2'];
	$amount3 =$_POST['amount3'];
	$amount4= $_POST['amount4'];
	$amount5= $_POST['amount5'];
	$amount6= $_POST['amount6'];
	
	
	date_default_timezone_set("America/New_York");
//echo "The time is " . date("y-m-d");
	$da=date("y-m-d");
	$ma=date("m");
	$ye=date("y");
	
	define('DB_NAME', 'jmllcdata');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST', 'localhost');

    // stored in a variable to TEST if it's working
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql =("SELECT * FROM worksheet WHERE date='$da'");
	$result=mysqli_query($conn,$sql);
	$rowcount=mysqli_num_rows($result);

if ($rowcount < "1") {
		$sql = "INSERT INTO worksheet (company1,company2,company3,company4,company5,company6,amount1,amount2,amount3,amount4,amount5,amount6,paidout,date,month,year) VALUES ('$company1','$company2','$company3','$company4','$company5','$company6','$amount1','$amount2','$amount3','$amount4','$amount5','$amount6',('$amount1'+'$amount2'+'$amount3'+'$amount4'+'$amount5'+'$amount6'),'$da','$ma','$ye')"; 
 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	}else{
	$sql = "UPDATE worksheet  SET company1='$company1',company2='$company2',company3='$company3',company4='$company4',company5='$company5',company6='$company6',amount1='$amount1',amount2='$amount2',amount3='$amount3',amount4='$amount4',amount5='$amount5',amount6='$amount6', paidout=('$amount1'+'$amount2'+'$amount3'+'$amount4'+'$amount5'+'$amount6') where date='$da'"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	
	}


//////////////////////////////////////////
////////////////////////////////////////////////
}


?>	
      
  </form>

  </div>
 
  <div class="column" style="background-color:#bbb;">
  
        <form  action="" method="POST">
			<p>High Tax Grocery ->:<input id="Groceryhigh" name="shreport1" type="text" class="input" placeholder="Enter High Grocery ">
			<p>Low Tax Grocery...->:<input id="Grocerylow" name="shreport2" type="text" class="input" placeholder="Enter Low Grocery ">
            <p>Tobacco.............->:<input id="Tobacco" name="shreport3" type="text" class="input" placeholder="Enter Tobacco Grocery ">
			<p>Beer................->:<input id="Beer" name="shreport4" type="text" class="input" placeholder="Enter Beer Grocery ">
			<p>No Tax / EBT........->:<input id="Notax" name="shreport5" type="text" class="input" placeholder="Enter Ebt Grocery ">
			<p>Total Tax Pay.....->:<input id="Tax" name="shreport6" type="text" class="input" placeholder="Enter  Tax">
            <p>Lottery Online.....->:<input id="lotteryonline" name="shreport7" type="text" class="input" placeholder="Enter Lottery Online">
			<p>Lottery Offline...->:<input id="lottery" name="shreport8" type="text" class="input" placeholder="Enter Lottery ">
			<p>Fuel Sales........->:<input id="Fuel" name="shreport9" type="text" class="input" placeholder="Enter Fuel ">
			<p>M. Order..........->:<input id="Money Order" name="shreport10" type="text" class="input" placeholder="Enter Money.Order ">
			<p>Paid In...........->:<input id="Paid in" name="shreport11" type="text" class="input" placeholder="Enter Paid In ">
<button class="btn_login"  type="submit" name='submit' onclick="cambiar_login()">Submit</button></p>

 
  <?php 
  //1,2,3,4,5,6,  7,8,9,10
  
if(isset($_POST['submit'])) {
    $shreport1 = $_POST['shreport1'];
	$shreport2 = $_POST['shreport2'];
	$shreport3 =$_POST['shreport3'];
	$shreport4= $_POST['shreport4'];
	$shreport5= $_POST['shreport5'];
	$shreport6= $_POST['shreport6'];
	$shreport7 = $_POST['shreport7'];
	$shreport8 =$_POST['shreport8'];
	$shreport9= $_POST['shreport9'];
	$shreport10= $_POST['shreport10'];
	$shreport11= $_POST['shreport11'];
	
	//('$shreport1'+'$shreport2'+'$shreport3'+'$shreport4'+'$shreport5'+'$shreport6'),
	
	date_default_timezone_set("America/New_York");
//echo "The time is " . date("y-m-d");
	$da=date("y-m-d");
	$ma=date("m");
	$ye=date("y");
	
	define('DB_NAME', 'jmllcdata');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST', 'localhost');

    // stored in a variable to TEST if it's working
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql =("SELECT * FROM worksheet WHERE date='$da'");
	$result=mysqli_query($conn,$sql);
	$rowcount=mysqli_num_rows($result);

if ($rowcount < "1") {
		$sql = "INSERT INTO worksheet (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport10,shreport11,shreport,date,month,year) VALUES ('$shreport1','$shreport2','$shreport3','$shreport4','$shreport5','$shreport6','$shreport7','$shreport8','$shreport9','$shreport10','$shreport11',('$shreport1'+'$shreport2'+'$shreport3'+'$shreport4'+'$shreport5'+'$shreport6'+'$shreport7'+'$shreport8'+'$shreport9'+'$shreport10'+'$shreport11'),'$da','$ma','$ye')"; 
 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	}else{
	$sql = "UPDATE worksheet  SET shreport1='$shreport1',shreport2='$shreport2',shreport3='$shreport3',shreport4='$shreport4',shreport5='$shreport5',shreport6='$shreport6',shreport7='$shreport7',shreport8='$shreport8',shreport9='$shreport9',shreport10='$shreport10',shreport11='$shreport11',shreport=('$shreport1'+'$shreport2'+'$shreport3'+'$shreport4'+'$shreport5'+'$shreport6'+'$shreport7'+'$shreport8'+'$shreport9'+'$shreport10'+'$shreport11') where date='$da'"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	
	}


//////////////////////////////////////////
$query="SELECT * FROM worksheet WHERE date='$da'";
	$response=mysqli_query( $conn,$query );

if($response)


while($row=mysqli_fetch_array($response)){

echo'<tr><td align="right">',

$row['shreport'],'</td><td align="right">';

echo'</tr>';
}
////////////////////////////////////////////////
}


?>	
      
  </form>


  </div>
  
<p><marquee behavior="alternate">WELL COME TO STORE MANAGEMENT SYSTEM</marquee></p>
<div class="row">
  <div class="column1" style="background-color:#aaa;">
  
  <form  action="" method="POST">
  <h2>Lotto Active</h2>
			<p><input id="lotto1" name="lotto1" type="text" class="input" placeholder="lotto Name ">
            <input id="box1" name="box1" type="text" class="input" placeholder="box">
            <p><input id="lotto2" name="lotto2" type="text" class="input" placeholder="lotto Name">
			<input id="box2" name="box2" type="text" class="input" placeholder="box">
			<p><input id="lotto3" name="lotto3" type="text" class="input" placeholder="lotto Name">
			<input id="box3" name="box3" type="text" class="input" placeholder="box">
			<p><input id="lotto4" name="lotto4" type="text" class="input" placeholder="lotto Name">
			<input id="box4" name="box4" type="text" class="input" placeholder="box">
			<p><input id="lotto5" name="lotto5" type="text" class="input" placeholder="lotto Name">
			<input id="box5" name="box5" type="text" class="input" placeholder="box">
			<p><input id="lotto6" name="lotto6" type="text" class="input" placeholder="lotto Name">
			<input id="box6" name="box6" type="text" class="input" placeholder="box">
			<p><input id="lotto7" name="lotto7" type="text" class="input" placeholder="lotto Name">
			<input id="box7" name="box7" type="text" class="input" placeholder="box">
			<p><input id="lotto8" name="lotto8" type="text" class="input" placeholder="lotto Name">
			<input id="box8" name="box8" type="text" class="input" placeholder="box">
			<p><input id="lotto9" name="lotto9" type="text" class="input" placeholder="lotto Name">
			<input id="box9" name="box9" type="text" class="input" placeholder="box">
			<p><input id="lotto10" name="lotto10" type="text" class="input" placeholder="lotto Name">
			<input id="box10" name="box10" type="text" class="input" placeholder="box">




<button class="btn_login"  type="submit" name='submit3' onclick="cambiar_login()">Submit</button></p>

 
  <?php 
if(isset($_POST['submit3'])) {
    $lotto1 = $_POST['lotto1'];
	$lotto2 = $_POST['lotto2'];
	$lotto3 =$_POST['lotto3'];
	$lotto4= $_POST['lotto4'];
	$lotto5= $_POST['lotto5'];
	$lotto6= $_POST['lotto6'];
	$lotto7 =$_POST['lotto7'];
	$lotto8= $_POST['lotto8'];
	$lotto9= $_POST['lotto9'];
	$lotto10= $_POST['lotto10'];
	
	$box1 = $_POST['box1'];
	$box2 = $_POST['box2'];
	$box3 =$_POST['box3'];
	$box4= $_POST['box4'];
	$box5= $_POST['box5'];
	$box6= $_POST['box6'];
	$box7 =$_POST['box7'];
	$box8= $_POST['box8'];
	$box9= $_POST['box9'];
	$box10= $_POST['box10'];
	
	
	date_default_timezone_set("America/New_York");
//echo "The time is " . date("y-m-d");
	$da=date("y-m-d");
	$ma=date("m");
	$ye=date("y");
	
	define('DB_NAME', 'jmllcdata');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST', 'localhost');

    // stored in a variable to TEST if it's working
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql =("SELECT * FROM worksheet WHERE date='$da'");
	$result=mysqli_query($conn,$sql);
	$rowcount=mysqli_num_rows($result);

if ($rowcount < "1") {
		$sql = "INSERT INTO worksheet (lotto1,lotto2,lotto3,lotto4,lotto5,lotto6,lotto7,lotto8,lotto9,lotto10,box1,box2,box3,box4,box5,box6,box7,box8,box9,box10,date,month,year) VALUES ('$lotto1','$lotto2','$lotto3','$lotto4','$lotto5','$lotto6','$lotto7','$lotto8','$lotto9','$lotto10','$box1','$box2','$box3','$box4','$box5','$box6','$box7','$box8','$box9','$box10','$da','$ma','$ye')"; 
 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	}else{
	$sql = "UPDATE worksheet  SET lotto1='$lotto1',lotto2='$lotto2',lotto3='$lotto3',lotto4='$lotto4',lotto5='$lotto5',lotto6='$lotto6',lotto7='$lotto7',lotto8='$lotto8',lotto9='$lotto9',lotto10='$lotto10',box1='$box1',box2='$box2',box3='$box3',box4='$box4',box5='$box5',box6='$box6',box7='$box7',box8='$box8',box9='$box9',box10='$box10' where date='$da'"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	
	}


//////////////////////////////////////////
////////////////////////////////////////////////
}


?>	
      
  </form>

  </div>
  
  <div class="column1" style="background-color:#bbb;">
  <h2>Shift Count</h2>
  <form  action="" method="POST">
			<p>Cash  ->:<input id="Cash" name="shcount1" type="text" class="input" placeholder="Enter Cash "></p>
            <p>Credit->:<input id="Credit" name="shcount2" type="text" class="input" placeholder="Enter  Credit">
            <p>Debit...->:<input id="Debit" name="shcount3" type="text" class="input" placeholder="Enter Debit ">
			<p>EBT->:<input id="EBT" name="shcount4" type="text" class="input" placeholder="Enter EBT ">
			<p>Chack->:<input id="Chack" name="shcount5" type="text" class="input" placeholder="Lotto Pay ">
			<p>Lotto Pay Online->:<input id="Lotto Payon" name="shcount6" type="text" class="input" placeholder="Lotto Pay ">
			<p>Lotto Pay Offline->:<input id="Lotto Payoff" name="shcount7" type="text" class="input" placeholder="Lotto Pay ">
						
			<p>Others.->:<input id="others" name="shcount8" type="text" class="input" placeholder="Enter others ">
<button class="btn_login"  type="submit" name='submit1' onclick="cambiar_login()">Submit</button></p>

 
  <?php 
if(isset($_POST['submit1'])) {
    $shcount1 = $_POST['shcount1'];
	$shcount2 = $_POST['shcount2'];
	$shcount3 =$_POST['shcount3'];
	$shcount4= $_POST['shcount4'];
	$shcount5= $_POST['shcount5'];
	$shcount6= $_POST['shcount6'];
	$shcount7= $_POST['shcount7'];
	$shcount8= $_POST['shcount8'];
	
	
	
	date_default_timezone_set("America/New_York");
//echo "The time is " . date("y-m-d");
	$da=date("y-m-d");
	$ma=date("m");
	$ye=date("y");
	
	define('DB_NAME', 'jmllcdata');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST', 'localhost');

    // stored in a variable to TEST if it's working
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql =("SELECT * FROM worksheet WHERE date='$da'");
	$result=mysqli_query($conn,$sql);
	$rowcount=mysqli_num_rows($result);

if ($rowcount < "1") {
		$sql = "INSERT INTO worksheet (shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount,date,month,year) VALUES ('$shcount1','$shcount2','$shcount3','$shcount4','$shcount5','$shcount6','$shcount7','$shcount8',('$shcount1'+'$shcount2'+'$shcount3'+'$shcount4'+'$shcount5'+'$shcount6'+'$shcount7'+'$shcount7'),'$da','$ma','$ye')"; 
 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	}else{
	$sql = "UPDATE worksheet  SET shcount1='$shcount1',shcount2='$shcount2',shcount3='$shcount3',shcount4='$shcount4',shcount5='$shcount5',shcount6='$shcount6',shcount7='$shcount7',shcount8='$shcount8',shcount=('$shcount1'+'$shcount2'+'$shcount3'+'$shcount4'+'$shcount5'+'$shcount6'+'$shcount7'+'$shcount8') where date='$da'"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }	
	
	}

//////////////////////////////////////////
$query="SELECT * FROM worksheet WHERE date='$da'";
	$response=mysqli_query( $conn,$query );

if($response)


while($row=mysqli_fetch_array($response)){

echo'<tr><td align="left">',

$row['shcount'],'</td><td align="left">';

echo'</tr>';
}
////////////////////////////////////////////////

$sql =("SELECT * FROM Pettycash WHERE date='$da' and cash=0");
	$result=mysqli_query($conn,$sql);
	$rowcount=mysqli_num_rows($result);

if ($rowcount < "1") {
		$sql = "INSERT INTO Pettycash (date,cash) VALUES ('$da','$shcount1')"; 
 
    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
//
	}else{
	$sql = "UPDATE Pettycash  SET cash='$shcount1' where date='$da'";
	if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	}
}

///////////////////////////////////

?>	
      
  </form>
  </div>
<a href="frontpage.php">Back to  Home</a>
<marquee bgcolor="pink">copy right sawda system inc</marquee>


</body>
</html>
