<?php

if(isset($_POST['submit2'])) {
     //date_default_timezone_set("America/New_York");
	$month = $_POST['month'];
	$month1=$month-1;
	$month2=$month-2;
	
	
	///$da = date("Y-m-d", strtotime($date));
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
	$pdf->Cell(80,10,'Daily Work Sheet','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	$pdf->Cell(80,10,'Keith Bridge Food Mart','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'3375 Keith Bridge Road','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'Cumming, GA: 30041','C');
   

   // Line break
 

$pdf->SetFont('Arial','B',10);
$pdf->Ln();







$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();

        $host="localhost";
$username="root";
$pass="";
$db="jmllcdata";
 
$conn=mysqli_connect($host,$username,$pass,$db);
if(!$conn){
	die("Database connection error");
}

////////////////////////////////////////
$del="DELETE FROM worksheettmp1 where shreport1<>'0' or shcount1<>'0' or shcount1=' '";
    if(!mysqli_query($conn, $del)) {
        die('Error: ' . mysqli_error($conn));
    }

 
$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=$month1 "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
////////////////////////////


 $del="DELETE FROM worksheettmp2 where shreport1<>'0' or shcount1<>'0' or shcount1=' '";
    if(!mysqli_query($conn, $del)) {
        die('Error: ' . mysqli_error($conn));
    }

 	
	//$sql1 = "INSERT INTO worksheettmp2 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount,paidout,date,month,year) SELECT shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount,paidout,date,month,year FROM worksheet where month='$month' "; 
    //if(!mysqli_query($conn,$sql1 )) {
      //  die('Error: ' . mysqli_error($conn));
	//}
////////////////////C_Month	
$sql1 = "INSERT INTO worksheettmp2 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount),sum(paidout) FROM worksheet where month=$month "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}

$sqlb="update worksheettmp2 set worksheettmp2.cmonth=('OCT2020')";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
/////////////// P_Month

$sqlb="update worksheettmp2,worksheettmp1 set worksheettmp2.shreport1a=(worksheettmp1.shreport1),worksheettmp2.shreport2a=(worksheettmp1.shreport2),worksheettmp2.shreport3a=(worksheettmp1.shreport3),worksheettmp2.shreport4a=(worksheettmp1.shreport4),worksheettmp2.shreport5a=(worksheettmp1.shreport5),worksheettmp2.shreport6a=(worksheettmp1.shreport6)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
//////// add shcount
$sqlb="update worksheettmp2,worksheettmp1 set worksheettmp2.shcount1a=(worksheettmp1.shcount1),worksheettmp2.shcount2a=(worksheettmp1.shcount2),worksheettmp2.shcount3a=(worksheettmp1.shcount3),worksheettmp2.shcount4a=(worksheettmp1.shcount4),worksheettmp2.shcount5a=(worksheettmp1.shcount5),worksheettmp2.shcount6a=(worksheettmp1.shcount6),worksheettmp2.shcount7a=(worksheettmp1.shcount7),worksheettmp2.paidouta=(worksheettmp1.paidout)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }


$sqlb="update worksheettmp2,worksheettmp1 set worksheettmp2.shreporta=(worksheettmp1.shreport1+worksheettmp1.shreport2+worksheettmp1.shreport3+worksheettmp1.shreport4+worksheettmp1.shreport5+worksheettmp1.shreport6)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqlb="update worksheettmp2,worksheettmp1 set worksheettmp2.shcounta=(worksheettmp1.shcount1+worksheettmp1.shcount2+worksheettmp1.shcount3+worksheettmp1.shcount4+worksheettmp1.shcount5+worksheettmp1.shcount6+worksheettmp1.paidout)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqlb="update worksheettmp2 set Overshorta=(shcounta-shreporta)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

////////////
	$sqlb="update worksheettmp2 set shreport=(shreport1+shreport2+shreport3+shreport4+shreport5+shreport6)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }


$sqlb="update worksheettmp2 set shcount=(shcount1+shcount2+shcount3+shcount4+shcount5+shcount6+paidout)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
	$sqlc="update worksheettmp2 set overshort=(shcount-shreport)";
if(!mysqli_query($conn, $sqlc)) {
       die('Error: ' . mysqli_error($conn));
    }


///////////////update over/short
$sqlb="update worksheettmp2 set shreport1b=(shreport1-shreport1a),shreport2b=(shreport2-shreport2a),shreport3b=(shreport3-shreport3a),shreport4b=(shreport4-shreport4a),shreport5b=(shreport5-shreport5a),shreport6b=(shreport6-shreport6a),shreportb=(shreport-shreporta)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqlb="update worksheettmp2 set shcount1b=(shcount1-shcount1a),shcount2b=(shcount2-shcount2a),shcount3b=(shcount3-shcount3a),shcount4b=(shcount4-shcount4a),shcount5b=(shcount5-shcount5a),shcount6b=(shcount6-shcount6a),paidoutb=(paidout-paidouta),shcountb=(shcount-shcounta)";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqlb="update worksheettmp2 set worksheettmp2.pmonth=('SEP2020')";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

$sqlc="update worksheettmp2 set overshortb=(shcountb-shreportb)";
if(!mysqli_query($conn, $sqlc)) {
       die('Error: ' . mysqli_error($conn));
    }

 $sql = "SELECT*  FROM worksheettmp2 ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $shreport1 = $rows[1];
            $shreport2 = $rows[2];
            $shreport3 = $rows[3];
            $shreport4 = $rows[4];
			$shreport5 = $rows[5];
            $shreport6= $rows[6];
			$shreport= $rows[7];
			 
			$shcount1 = $rows[8];
            $shcount2 = $rows[9];
            $shcount3 = $rows[10];
            $shcount4 = $rows[11];
			$shcount5 = $rows[12];
            $shcount6= $rows[13];
			$shcount7= $rows[14];
			$shcount= $rows[15];
			$Overshort= $rows[16];
			$paidout=$rows[17];
			
			$shreport1a = $rows[18];
            $shreport2a = $rows[19];
            $shreport3a = $rows[20];
            $shreport4a = $rows[21];
			$shreport5a = $rows[22];
            $shreport6a= $rows[23];
			$shreporta= $rows[24];
			 
			$shcount1a = $rows[25];
            $shcount2a = $rows[26];
            $shcount3a = $rows[27];
            $shcount4a = $rows[28];
			$shcount5a = $rows[29];
            $shcount6a= $rows[30];
			$shcount7a= $rows[31];
			$shcounta= $rows[32];
			$Overshorta= $rows[33];
			$paidouta=$rows[34];
			
			$shreport1b = $rows[35];
            $shreport2b = $rows[36];
            $shreport3b = $rows[37];
            $shreport4b = $rows[38];
			$shreport5b = $rows[39];
            $shreport6b= $rows[40];
			$shreportb= $rows[41];
			 
			$shcount1b = $rows[42];
            $shcount2b = $rows[43];
            $shcount3b = $rows[44];
            $shcount4b = $rows[45];
			$shcount5b = $rows[46];
            $shcount6b= $rows[47];
			$shcount7b= $rows[48];
			$paidoutb=$rows[49];
			$shcountb= $rows[50];
			$Overshortb= $rows[51];
			$pmonth=$rows[52];
			$cmonth=$rows[53];
			
			
			//$date=$rows[50];
			//$pdf->Cell(80,10,$date,'C');
					
			//$pdf->Ln();

			$pdf->Cell(10);
			$pdf->Cell(60,7,"Shift Report",1,0,'C');
			$pdf->Cell(30,7,"$pmonth",1,0);
			$pdf->Cell(30,7,"$cmonth",1,0,'C');
			$pdf->Cell(30,7,"Over/Sort",1,1);
			 
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Grocery",1,0);
            $pdf->Cell(30,7,$shreport1a,1,0);
			$pdf->Cell(30,7,$shreport1,1,0);
			 $pdf->Cell(30,7,$shreport1b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Tax",1,0);
            $pdf->Cell(30,7,$shreport2a,1,0);
			$pdf->Cell(30,7,$shreport2,1,0);
			 $pdf->Cell(30,7,$shreport2b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Lottery",1,0);
            $pdf->Cell(30,7,$shreport3a,1,0);
			$pdf->Cell(30,7,$shreport3,1,0);
			 $pdf->Cell(30,7,$shreport3b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Gas",1,0);
            $pdf->Cell(30,7,$shreport4a,1,0);
			$pdf->Cell(30,7,$shreport4,1,0);
			 $pdf->Cell(30,7,$shreport4b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"M. Order",1,0);
            $pdf->Cell(30,7,$shreport5a,1,0);
			$pdf->Cell(30,7,$shreport5,1,0);
			 $pdf->Cell(30,7,$shreport5b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Paidin",1,0);
            $pdf->Cell(30,7,$shreport6a,1,0);
			$pdf->Cell(30,7,$shreport6,1,0);
			 $pdf->Cell(30,7,$shreport6b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Total",1,0);
            $pdf->Cell(30,7,$shreporta,1,0);
			$pdf->Cell(30,7,$shreport,1,0);
			 $pdf->Cell(30,7,$shreportb,1,1);
			
			
			 
			 
$pdf->Ln();
$pdf->Ln();
			//$pdf->Cell(30,7,"");
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Shift Count",1,0,'C');
			$pdf->Cell(30,7,"$pmonth",1,0);
			$pdf->Cell(30,7,"$cmonth",1,0,'C');
			$pdf->Cell(30,7,"Over/Short",1,1);
			
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Cash",1,0);
			$pdf->Cell(30,7,$shcount1a,1,0);
			$pdf->Cell(30,7,$shcount1,1,0);
			$pdf->Cell(30,7,$shcount1b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Credit",1,0);
			$pdf->Cell(30,7,$shcount2a,1,0);
			$pdf->Cell(30,7,$shcount2,1,0);
			$pdf->Cell(30,7,$shcount2b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Debit",1,0);
			$pdf->Cell(30,7,$shcount3a,1,0);
			$pdf->Cell(30,7,$shcount3,1,0);
			$pdf->Cell(30,7,$shcount3b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"EBT",1,0);
			$pdf->Cell(30,7,$shcount4a,1,0);
			$pdf->Cell(30,7,$shcount4,1,0);
			$pdf->Cell(30,7,$shcount4b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Lottery",1,0);
			$pdf->Cell(30,7,$shcount5a,1,0);
			$pdf->Cell(30,7,$shcount5,1,0);
			$pdf->Cell(30,7,$shcount5b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Others",1,0);
			$pdf->Cell(30,7,$shcount6a,1,0);
			$pdf->Cell(30,7,$shcount6,1,0);
			$pdf->Cell(30,7,$shcount6b,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Paidout",1,0);
			$pdf->Cell(30,7,$paidouta,1,0);
			$pdf->Cell(30,7,$paidout,1,0);
			$pdf->Cell(30,7,$paidoutb,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Total",1,0);
			$pdf->Cell(30,7,$shcounta,1,0);
			$pdf->Cell(30,7,$shcount,1,0);
			$pdf->Cell(30,7,$shcountb,1,1);
			
			$pdf->Cell(10);
			$pdf->Cell(60,7,"Over/Sort",1,0);
			$pdf->Cell(30,7,$Overshorta,1,0);
			$pdf->Cell(30,7,$Overshort,1,0);
			$pdf->Cell(30,7,$Overshortb,1,1);

			
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