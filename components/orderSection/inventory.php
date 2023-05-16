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
.columnl {
  float: left;
  width: 25%;
  padding: 10px;
  height: 550px; /* Should be removed. Only for demonstration */
}

/* Create two equal columns that floats next to each other */
.columnr {
  float: left;
  width: 75%;
  padding: 10px;
  height: 550px; /* Should be removed. Only for demonstration */
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
<h2>Inventory List</h2>

<div class="content">


<div class="row">
  <div class="columnl" style="background-color:#aaa;">
    
	
	<form method = "POST">
	   <h2>company or Person</h2>
			 
<select name='cidno'>
 <?php 
$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysqli_error($mysql));
$sql = mysqli_query($conn, "SELECT cidno,cname FROM company ");
 while ($row = $sql->fetch_assoc()){
echo '<option value="'.$row['cname'].'">'.$row['cname'].'</option>';
//echo '<option value='.$row['cname'].'</option>';
}

?>
</select>

	<td><input type="text" name="code" id="code" value="" placeholder=" Bar code" autofocus required/><p>
<td><input type="text" name="quntity" id="quntit" value="" placeholder="quntit" autofocus required/><p>
	<input type = "submit" name = "submit" value = "ADD">




</form>
   
   <form method = "POST">

<h2>Add New Inventory</h2>
<input type="text" name="bname" id="bname" value="" placeholder="Brand Name"/></p>
<select name='bidno'>
 <?php 
$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysqli_error($mysql));
$sql = mysqli_query($conn, "SELECT cidno,cname FROM category ");
 while ($row = $sql->fetch_assoc()){
echo '<option value="'.$row['cname'].'">'.$row['cname'].'</option>';
//echo '<option value='.$row['cname'].'</option>';
}

?>
</select>


<input type="text" name="code" id="code" value="" placeholder="Bar Code"/></p>

	<input type = "submit" name = "submit2" value = "New">


</form>
<a href="../../frontpage.php">Back to  Home</a>   
  </div>
  <div class="columnr" style="background-color:#bbb;">
    <h2>inventory</h2>
	<?php 

if(isset($_POST['submit'])) {
    
	$code = $_POST['code'];
	$cname = $_POST['cidno'];
	//$bname = $_POST['barcode'];
	$quntity = $_POST['quntity'];
	
$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysqli_error($mysql));

$query="SELECT* from Inventory where barcode=$code";
$result=mysqli_query($conn,$query);
$rowcount=mysqli_num_rows($result);
if ($rowcount>'0') {
//if (mysqli_num_rows($result) > 0) {

//echo count($result);
//if($result>' '){
	
	$sql = "INSERT INTO orderlist (barcode,cname,quntity,date) VALUES ('$code','$cname','$quntity',now())"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
	
	$sqlu = "update orderlist,Inventory set orderlist.bname=Inventory.bname where orderlist.barcode=inventory.barcode"; 
    if(!mysqli_query($conn, $sqlu)) {
       die('Error: ' . mysqli_error($conn));
    }
	
$query="SELECT * FROM orderlist  ORDER BY idno DESC";
$response=mysqli_query( $conn,$query );


if($response)
	
{
 echo "<table><tr><th>Product Code</th><th>company</th><th>Description</th><th>Quntity</th></tr>";
 
while($row=mysqli_fetch_array($response)){

	
	echo'<tr><td align="left">',

$row['barcode'],'</td><td align="left">',	
$row['cname'],'</td><td align="left">',
$row['bname'],'</td><td align="left">',
$row['quntity'],'</td><td align="left">';
echo'</tr>';
}

echo'</table>';

}
}
else {
    echo "0 results";
}

$conn->close();
}

?>
<?php 

if(isset($_POST['submit2'])) {
    
	$code = $_POST['code'];
	$cname = $_POST['bidno'];
	//$bname = $_POST['barcode'];
	$bname = $_POST['bname'];
	
$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysqli_error($mysql));

$sqls="SELECT* Inventory where barcode=$code";
$result=mysqli_query($conn,$sqls);

//if($result>0){
	
	$sql = "INSERT INTO inventory (barcode,cname,bname,date) VALUES ('$code','$cname','$bname',now())"; 

    if(!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    }
$query="SELECT * FROM inventory  ORDER BY idno DESC";
$response=mysqli_query( $conn,$query );


if($response)
	
{
 echo "<table><tr><th>Product Code</th><th>company</th><th>Description</th></tr>";
 
while($row=mysqli_fetch_array($response)){

	
	echo'<tr><td align="left">',

$row['barcode'],'</td><td align="left">',	
$row['cname'],'</td><td align="left">',
$row['bname'],'</td><td align="left">';

echo'</tr>';
}

echo'</table>';

}
//}
//else {
  //  echo "results found";
//}

$conn->close();
}

?>

	</div>
	
<marquee bgcolor="pink">copy right sawda system inc</marquee>


</body>
</html>
