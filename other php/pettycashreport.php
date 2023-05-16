<?php

if(isset($_POST['submit'])) {
     //date_default_timezone_set("America/New_York");
	$month = $_POST['month'];
	//$da = date("Y-m-d", strtotime($date));
	//echo $da;
	
//include connection file 

include_once('fpdf/fpdf.php');
 
$pdf=new FPDF();
$pdf->AddPage();
//$pdf->Cell(80);
//$pdf->Image('images/First Data.png',20,10,50);
    $pdf->SetFont('Arial','B',13);
    // Move to the right
	$pdf->Ln();    // Title
	$pdf->Cell(60,7,"");
	$pdf->Cell(80,10,'Petty Cash Report','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	$pdf->Cell(80,10,'Keith Bridge Food Mart','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'3375 Keith Bridge Road','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'Cumming, GA: 30041','C');
   $pdf->Cell(80,10,$month,'C');

   // Line break
 

$pdf->SetFont('Arial','B',10);
$pdf->Ln();







$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();
			$pdf->Cell(35,7,"Date",1,0,'C');
			$pdf->Cell(35,7,"Account",1,0,'C');
			$pdf->Cell(35,7,"Amount",1,0,'C');
			$pdf->Cell(35,7,"Cash",1,0,'C');
			$pdf->Cell(35,7,"Rest",1,1,'C');

        //include "dbconfig.php";
		//date_default_timezone_set("America/New_York");
	//$da=date("y-m-d");
		
		
$host="localhost";
$username="root";
$pass="";
$db="jmllcdata";
 
$conn=mysqli_connect($host,$username,$pass,$db);
if(!$conn){
	die("Database connection error");
}

 $del="DELETE FROM pettycashtmp where cash<>'0' or amount<>'0' or cash=0 or amount=0";
    if(!mysqli_query($conn, $del)) {
        die('Error: ' . mysqli_error($conn));
    }
//$sql1 = "INSERT INTO pettycashtmp (cashrest) SELECT (sum(cash)-sum(amount)) FROM pettycash where month<'$month' "; 
  //  if(!mysqli_query($conn,$sql1 )) {
    //  die('Error: ' . mysqli_error($conn));
	//}

// 	$sql1 = "INSERT INTO pettycashtmp (amount,cash) SELECT sum(amount),sum(cash) FROM pettycash where month<'$month' "; 
  //  if(!mysqli_query($conn,$sql1 )) {
    //    die('Error: ' . mysqli_error($conn));
	//}

$sql = "INSERT INTO pettycashtmp (date,account,amount,cash) SELECT date,account,amount,cash FROM pettycash where month='$month' "; 
  if(!mysqli_query($conn,$sql )) {
        die('Error: ' . mysqli_error($conn));
	}

 	
 //	$sql1 = "INSERT INTO pettycashtmp (cashrest) SELECT (sum(cash)-sum(amount)) FROM pettycash where month<='$month' "; 
   // if(!mysqli_query($conn,$sql1 )) {
    //  die('Error: ' . mysqli_error($conn));
	//}


 $sql = "SELECT*  FROM pettycashtmp ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $date = $rows[1];
            $account = $rows[2];
            $amount = $rows[3];
            $cash = $rows[4];
			$restof = $rows[5];
            $month= $rows[6];
			
			
		 
			
			$pdf->Cell(35,7,$date,1,0);
            $pdf->Cell(35,7, $account,1,0);
			$pdf->Cell(35,7,"$amount",1,0);
			$pdf->Cell(35,7,"$cash",1,0);
			$pdf->Cell(35,7,$restof,1,0);

			

			
           
            $pdf->Ln(); 
        }

  
      
$pdf->Output();
}
?>