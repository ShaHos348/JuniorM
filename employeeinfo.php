<?php
if(isset($_POST['submit'])) {
	$name = $_POST['idno'];
//include connection file 
//include "dbconfig.php";
include_once('fpdf/fpdf.php');
 
 
 
$pdf=new FPDF();
$pdf->AddPage();

$pdf->Image('images/First Data.png',20,10,50);
    $pdf->SetFont('Arial','B',13);
    // Move to the right
   $pdf->Cell(80);
    // Title
    $pdf->Cell(100,10,'Employee Information',1,0,'C');
    // Line break
   $pdf->Ln();


$pdf->SetFont('Arial','B',10);
$pdf->Ln();
$pdf->Ln();

$pdf->SetFont('times','B',10);
$pdf->Cell(30,7,"Employee ID",1,0,'C');
$pdf->Cell(35,7,"Employee Name",1,0,'C');
$pdf->Cell(35,7,"Street",1,0,'C');
$pdf->Cell(35,7,"Zip",1,0,'C');

$pdf->Cell(35,7,"Phone No",1,0,'C');


$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();

        //include "dbconfig.php";
		$host="localhost";
$username="root";
$pass="";
$db="jmllcdata";
 
$conn=mysqli_connect($host,$username,$pass,$db);
if(!$conn){
	die("Database connection error");
}
 

 //$sql = "SELECT idno,name,street,Zip,phone FROM employee where name='$name'";
 $sql = "SELECT idno,name,street,Zip,phone FROM employee ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $idno = $rows[0];
            $name = $rows[1];
            $street = $rows[2];
            $Zip = $rows[3];
            $phone = $rows[4];
            
            $pdf->Cell(30,7,$idno,1,0,'L');
            $pdf->Cell(35,7,$name,1,0,'L');
            $pdf->Cell(35,7,$street,1,0,'L');
            $pdf->Cell(35,7,$Zip,1,0,'L');
            $pdf->Cell(35,7,$phone,1,0,'L');
           
            $pdf->Ln(); 
        }

  
      
$pdf->Output();
}



?>