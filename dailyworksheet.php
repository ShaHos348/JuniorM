<?php

if(isset($_POST['submit'])) {
     //date_default_timezone_set("America/New_York");
	$date = $_POST['date'];
	$da = date("Y-m-d", strtotime($date));
	//echo $da;
	
//include connection file 

include_once('fpdf/fpdf.php');
 
$pdf=new FPDF();
$pdf->AddPage();

$pdf->Image('images/First Data.png',20,10,50);
    $pdf->SetFont('Arial','B',13);
    // Move to the right
   $pdf->Cell(80);
    // Title
    $pdf->Cell(100,10,'Daily Work Sheet
	Keith Bridge Food Mart',1,0,'C');
    // Line break
   $pdf->Ln();


$pdf->SetFont('Arial','B',10);
$pdf->Ln();
$pdf->Ln();







$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();

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

 $del="DELETE FROM worksheettmp where shreport1<>'0' or shcount1<>'0' or shcount1=' '";
    if(!mysqli_query($conn, $del)) {
        die('Error: ' . mysqli_error($conn));
    }

 //$sql = "SELECT idno,name,street,Zip,phone FROM employee where name='$name'";
 
 $sql1 = "INSERT INTO worksheettmp (shreport1,shreport2,shreport3,shreport4,shreport6,shcount1,shcount2,shcount3,shcount4) SELECT sum(shreport1+shreport2+shreport3),shreport4,sum(shreport6+shreport7),sum(shreport8+shreport9+shreport10+shreport11),sum(shreport1+shreport2+shreport3+shreport4+shreport5+shreport6+shreport7+shreport8+shreport9+shreport10+shreport11),shcount1,shcount2,shcount3,shcount4 FROM worksheet where date='$da' "; 
    if(!mysqli_query($conn,$sql1 )) {
        die('Error: ' . mysqli_error($conn));
	}
	$sqlu = "update worksheettmp,paidout2 set worksheettmp.cname1=paidout2.cname1,worksheettmp.cname2=paidout2.cname2,worksheettmp.cname3=paidout2.cname3,worksheettmp.cname4=paidout2.cname4,worksheettmp.cname5=paidout2.cname5 where paidout2.date='$da'"; 
    if(!mysqli_query($conn, $sqlu)) {
       die('Error: ' . mysqli_error($conn));
    }
$sqlu = "update worksheettmp,paidout2 set worksheettmp.amount1=paidout2.amount1,worksheettmp.amount2=paidout2.amount2,worksheettmp.amount3=paidout2.amount3,worksheettmp.amount4=paidout2.amount4,worksheettmp.amount5=paidout2.amount5 where paidout2.date='$da'"; 
    if(!mysqli_query($conn, $sqlu)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqla = "update worksheettmp set worksheettmp.shcount5=(worksheettmp.amount1+worksheettmp.amount2+worksheettmp.amount3+worksheettmp.amount4+worksheettmp.amount5)"; 
    if(!mysqli_query($conn, $sqla)) {
       die('Error: ' . mysqli_error($conn));
    }
$sqlb="update worksheettmp set shcount6=(shcount1+shcount2+shcount3+shcount4+shcount5)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
	$sqlc="update worksheettmp set shcount7=(shcount6-shreport6)";
if(!mysqli_query($conn, $sqlc)) {
       die('Error: ' . mysqli_error($conn));
    }

 $sql = "SELECT*  FROM worksheettmp ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $shreport1 = $rows[1];
            $shreport2 = $rows[2];
            $shreport3 = $rows[3];
            $shreport4 = $rows[4];
			$shreport5 = $rows[5];
            $shreport6= $rows[6];
			 $shreport7= $rows[7];
			 
			 $shcount1 = $rows[8];
            $shcount2 = $rows[9];
            $shcount3 = $rows[10];
            $shcount4 = $rows[11];
			$shcount5 = $rows[12];
            $shcount6= $rows[13];
			$shcount7= $rows[14];
			
			 $cname1 = $rows[15];
            $amount1 = $rows[16];
            $cname2 = $rows[17];
            $amount2 = $rows[18];
			$cname3 = $rows[19];
            $amount3= $rows[20];
			$cname4= $rows[21];
			$amount4= $rows[22];
			$cname5= $rows[23];
			$amount5= $rows[24];
			
			
			 $pdf->Cell(70,7,"Paidout",1,0,'C');
           
			
			$pdf->Cell(30);
			$pdf->Cell(70,7,"Shift Report",1,0,'C');
			 $pdf->Cell(35,7,"");
			 
			
			$pdf->Cell(35,7,$cname1,1,0);
            $pdf->Cell(35,7, $amount1,1,0);
			
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Grocery",1,0);
			 $pdf->Cell(35,7,$shreport1,1,1);

			$pdf->Cell(35,7,$cname1,1,0);
            $pdf->Cell(35,7, $amount1,1,0);
			
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Grocery",1,0);
			 $pdf->Cell(35,7,$shreport1,1,1);

			
			$pdf->Cell(35,7, $cname2,1,0);
			$pdf->Cell(35,7, $amount2,1,0);
			$pdf->Cell(30);
			 $pdf->Cell(35,7,"M order",1,0);
			$pdf->Cell(35,7,$shreport2,1,1);
			
			$pdf->Cell(35,7,"$cname3",1,0);
			$pdf->Cell(35,7,$amount3,1,0);
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Lottery",1,0);
			$pdf->Cell(35,7,$shreport3,1,1);
			$pdf->Cell(35,7,"$cname4",1,0);
			$pdf->Cell(35,7,$amount4,1,0);
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Gas",1,0);
			$pdf->Cell(35,7,$shreport4,1,1);
			
			$pdf->Cell(35,7,"$cname5",1,0);
			$pdf->Cell(35,7,$amount5,1,0);
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Paidin",1,0);
			$pdf->Cell(35,7,$shreport5,1,1);
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Total",1,0);
			$pdf->Cell(35,7,$shreport6,1,1);
    // Title
	

$pdf->Ln();
$pdf->Ln();
$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(70,7,"Shift Count",1,0,'C');
			$pdf->Cell(35,7,"");
			
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Cash",1,0);
			$pdf->Cell(35,7,$shcount1,1,1);

			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Cash",1,0);
			$pdf->Cell(35,7,$shcount1,1,1);

			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Card",1,0);
			$pdf->Cell(35,7,$shcount2,1,1);
			

			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Ebt",1,0);
			$pdf->Cell(35,7,$shcount3,1,1);
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Lottery",1,0);
			$pdf->Cell(35,7,$shcount4,1,1);
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Paidout",1,0);
			$pdf->Cell(35,7,$shcount5,1,1);
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Total",1,0);
			$pdf->Cell(35,7,$shcount6,1,1);
			
			$pdf->Cell(35,7,"");
			$pdf->Cell(35,7,"");
			$pdf->Cell(30);
			$pdf->Cell(35,7,"Over/Sort",1,0);
			$pdf->Cell(35,7,$shcount7,1,1);
	
$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();
			
            //$pdf->Cell(35,7,$shreport1,1,0,'L');
            //$pdf->Cell(35,7,$shreport2,1,0,'L');
            //$pdf->Cell(35,7,$shreport3,1,0,'L');
           // $pdf->Cell(30,7,$shreport4,1,0,'L');
			//$pdf->Cell(30,7,$shreport5,1,0,'L');
           // $pdf->Cell(30,7,$shreport6,1,0,'L');
           
            $pdf->Ln(); 
        }

  
      
$pdf->Output();
}
?>