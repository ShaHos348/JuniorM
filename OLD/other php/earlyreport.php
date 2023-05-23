<?php

if(isset($_POST['submit'])) {
     //date_default_timezone_set("America/New_York");
	$year = $_POST['year'];
	//$month1=$month-1;
	//$month2=$month-2;
	
	
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
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	$pdf->Cell(80,10,'Keith Bridge Food Mart','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'3375 Keith Bridge Road','C');
	$pdf->Ln();
	$pdf->Cell(60,7,"");
	
	$pdf->Cell(80,10,'Cumming, GA: 30041','C');
   
	$pdf->Ln();    // Title
	$pdf->Cell(60,7,"");
	$pdf->Cell(80,10,'Yearly Report By Monthly ','C');
	$pdf->Cell(30,7,$year,1,0,'L');
   // Line break
 

$pdf->SetFont('Arial','B',10);
$pdf->Ln();







$pdf->Cell(50,7,"----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
$pdf->Ln();
$pdf->Cell(10);
			$pdf->Cell(30,7,"Monthly",1,0,'C');
			$pdf->Cell(30,7,"Grocery",1,0,'C');
			$pdf->Cell(30,7,"Tax",1,0,'C');
			$pdf->Cell(30,7,"Lottery",1,0,'C');
			$pdf->Cell(30,7,"Gas",1,0,'C');
			$pdf->Cell(30,7,"GM",1,1,'C');
			

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

// Month=january
 
$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=1 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}

$sqlb="update worksheettmp1 set worksheettmp1.month=('January') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=February

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=2 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('February') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=March

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=3 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('March') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=April

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=4 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('April') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=May

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=5 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('May') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=June

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=6 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('June') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=July

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=7 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('July') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=August

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=8 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('August') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=September

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=9 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('September') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=October

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=10 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('October') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=November

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=11 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}
$sqlb="update worksheettmp1 set worksheettmp1.month=('November') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }
// Month=December

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where month=12 and year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}

$sqlb="update worksheettmp1 set worksheettmp1.month=('December') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

// Month=Total

$sql1 = "INSERT INTO worksheettmp1 (shreport1,shreport2,shreport3,shreport4,shreport5,shreport6,shreport7,shreport8,shreport9,shreport,shcount1,shcount2,shcount3,shcount4,shcount5,shcount6,shcount7,shcount8,shcount9,shcount,paidout) SELECT sum(shreport1),sum(shreport2),sum(shreport3),sum(shreport4),sum(shreport5),sum(shreport6),sum(shreport7),sum(shreport8),sum(shreport9),sum(shreport),sum(shcount1),sum(shcount2),sum(shcount3),sum(shcount4),sum(shcount5),sum(shcount6),sum(shcount7),sum(shcount8),sum(shcount9),sum(shcount),sum(paidout) FROM worksheet where  year=$year "; 
    if(!mysqli_query($conn,$sql1 )) {
      die('Error: ' . mysqli_error($conn));
	}

$sqlb="update worksheettmp1 set worksheettmp1.month=('Total') where month=' '";
if(!mysqli_query($conn, $sqlb)) {
       die('Error: ' . mysqli_error($conn));
    }

////////////////////////////


 $sql = "SELECT*  FROM worksheettmp1 ";
        
		$result=mysqli_query( $conn,$sql);

        while($rows=mysqli_fetch_array($result))
        {
            $grocery = $rows[1];
            $tax = $rows[2];
            $lotto = $rows[3];
            $gas = $rows[4];
			$gm = $rows[5];
           $month=$rows[51];
			
			//$date=$rows[50];
			//$pdf->Cell(80,10,$date,'C');
					
			//$pdf->Ln();

			 
			$pdf->Cell(10);
			$pdf->Cell(30,7,$month,1,0,'L');
			$pdf->Cell(30,7,$grocery,1,0,'R');
			$pdf->Cell(30,7,$tax,1,0,'R');
			$pdf->Cell(30,7,$lotto,1,0,'R');
			$pdf->Cell(30,7,$gas,1,0,'R');
			$pdf->Cell(30,7,$gm,1,1,'R');
			
			
            //$pdf->Cell(35,7,$shreport1,1,0,'L');
            //$pdf->Cell(35,7,$shreport2,1,0,'L');
            //$pdf->Cell(35,7,$shreport3,1,0,'L');
           // $pdf->Cell(30,7,$shreport4,1,0,'L');
			//$pdf->Cell(30,7,$shreport5,1,0,'L');
           // $pdf->Cell(30,7,$shreport6,1,0,'L');
           
            //$pdf->Ln(); 
        }

  
      
$pdf->Output();
}
?>