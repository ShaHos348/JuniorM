<?php

if(isset($_POST['submit2'])) {
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
			$pdf->Cell(23,7,"Date",1,0,'C');
			$pdf->Cell(23,7,"Pv_In_slno",1,0,'C');
			$pdf->Cell(23,7,"Pv_Out_Slno",1,0,'C');
			$pdf->Cell(23,7,"In_slno",1,0,'C');
			$pdf->Cell(23,7,"Out_slno",1,0,'C');
			$pdf->Cell(23,7,"In",1,0,'C');
			$pdf->Cell(23,7,"Out",1,0,'C');
			$pdf->Cell(23,7,"+/-",1,1,'C');
			
			

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

 $del="DELETE FROM gmreport where cin<>'0' or cout<>'0' or cin=0 or cout=0";
    if(!mysqli_query($conn, $del)) {
        die('Error: ' . mysqli_error($conn));
    }

 	$sql1 = "INSERT INTO gmreport (date,creditin,creditout,cin,cout,amountin,amountout,lossprofit,month,year) SELECT date,creditin,creditout,cin,cout,amountin,amountout,lossprofit,month,year FROM gm where month='$month' "; 
    if(!mysqli_query($conn,$sql1 )) {
        die('Error: ' . mysqli_error($conn));
	}



 $sql = "SELECT*  FROM gmreport ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $date = $rows[1];
            $creditin=$rows[2];
			$creditout= $rows[3];
			$cin= $rows[4];
			$cout= $rows[5];
			$amountin= $rows[6];
			$amountout= $rows[7];
			$lossprofit= $rows[8];
			
		 
			
			$pdf->Cell(23,7,$date,1,0);
            $pdf->Cell(23,7, $creditin,1,0);
			$pdf->Cell(23,7,"$creditout",1,0);
			$pdf->Cell(23,7,"$cin",1,0);
			$pdf->Cell(23,7,$cout,1,0);

			$pdf->Cell(23,7,"$amountin",1,0);
			$pdf->Cell(23,7,"$amountout",1,0);
			$pdf->Cell(23,7,$lossprofit,1,0);


			
           
            $pdf->Ln(); 
        }

  
      
$pdf->Output();
}
?>