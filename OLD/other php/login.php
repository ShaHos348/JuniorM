<!DOCTYPE html>
<html lang="en" >

<script type="text/javascript">
    function cambiar_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);  
  }

function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);  


}    



function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }
  
   $(function () {
        $("#btnSubmit").click(function () {
            var password = $("#txtPassword").val();
            var confirmPassword = $("#txtConfirmPassword").val();
            if (password != confirmPassword) {
                alert("Passwords do not match.");
                return false;
            }
            return true;
        });
    });
  
</script>
<link type="text/css" rel="stylesheet" href="css/stylelogin.css"/>

<div class="cotn_principal">
<div class="cont_centrar">

  <div class="cont_login">
<div class="cont_info_log_sign_up">
      <div class="col_md_login">
<div class="cont_ba_opcitiy">
        
        <h2>LOGIN</h2>  
  <p>Returning customer.</p> 
  <button class="btn_login" onclick="cambiar_login()">LOGIN</button>
  </div>
  </div>
<div class="col_md_sign_up">
<div class="cont_ba_opcitiy">
  <h2>SIGN UP</h2>

  
  <p>No account yet?.</p>

  <button class="btn_sign_up" onclick="cambiar_sign_up()">SIGN UP</button>
</div>
  </div>
       </div>

    
    <div class="cont_back_info">
       <div class="cont_img_back_grey">
       <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
       </div>
       
    </div>
<div class="cont_forms" >
 <form  action="" method="POST">
    <div class="cont_img_back_">
       <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
       </div>
	   
 <div class="cont_form_login">
 
  
<a href="#" onclick="ocultar_login_sign_up()" ><i class="material-icons">&#xE5C4;</i></a>
   <h2>LOGIN</h2>
   
 <input id="username" name="username"  type="email" class="input" placeholder="Enter Your Username" required>
 <input id="password" name="password" type="password" class="input" data-type="password" placeholder="Enter Your password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>



<button class="btn_login"  type="submit" name='submit' onclick="cambiar_login()">LOGIN</button>
  </div>
   <?php 

if(isset($_POST['submit'])) {
    
	$username = $_POST['username'];
	$password = $_POST['password'];
	//$username = 'mdbhfsss@gmail.com';
	//$password = 'Wa1';

$dbhost = 'localhost'; 
$dbuser = 'root';
$dbpass = '';
$dbname='jmllcdata';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname); if(! $conn )
die('Could not connect: ' . mysqli_error($mysql));

	$query="SELECT*  from client where username='$username' and password='$password'";
	$result =mysqli_query($conn,$query );
	
	if (mysqli_num_rows($result) > 0) {

header("Location: frontpage.php");
//echo "Query  return any result";

} else {

echo "Query didn't return any result";

}


	}
?>	
      </form>
	  
	<form action="signup.php" method="POST"> 
   <div class="cont_form_sign_up">
   
<a href="#" onclick="ocultar_login_sign_up()"><i class="material-icons">&#xE5C4;</i></a>
     <h2>SIGN UP</h2>
 <input id="username" placeholder="Enter Your Email" name="username" type="email" class="input" required>
<input id="txtPassword" placeholder="Enter Your Password"  name="password1" type="password" class="input" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 3 or more characters" required> 
 <input id="txtConfirmPassword"  placeholder="Confirm Password" name="password2" type="password" class="input"    required>
 
 
<button class="btn_sign_up" name='submit2' onclick="cambiar_sign_up()">SIGN UP</button>



  </div>
 </form>
    </div>
    
  </div>
 </div>
</div>
	
	  
</body>
</html>