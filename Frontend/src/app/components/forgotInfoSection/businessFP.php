<style>
    body {
        background-color: gray;
    }

    .content {
        max-width: 650px;
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
        width: 25%;
        padding: 10px;
        height: 350px;
        /* Should be removed. Only for demonstration */
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

    #frmForgot {
        padding: 20px 60px;
        background: #B6FFDA;
        color: #A5A355;
        display: inline-block;
        border-radius: 4px;
    }

    #frmReset {
        padding: 20px 60px;
        background: #B6E1FF;
        color: #A5A355;
        display: inline-block;
        border-radius: 4px;
    }

    .field-group {
        margin-top: 20px;
    }

    .input-field {
        padding: 8px;
        width: 500px;
        border: #A3C3E7 1px solid;
        border-radius: 4px;
    }

    .form-submit-button {
        background: #13BED0;
        border: 0;
        padding: 8px 20px;
        border-radius: 4px;
        color: #FFF;
        text-transform: uppercase;
    }

    .member-dashboard {
        padding: 40px;
        background: #D2EDD5;
        color: #555;
        border-radius: 4px;
        display: inline-block;
    }

    .member-dashboard a {
        color: #09F;
        text-decoration: none;
    }

    #validation-message {
        text-align: center;
        color: #FF0000;
    }

    .success_message {
        text-align: center;
        color: #07AB61;
    }
</style>


<script>
    function validate_forgot() {
        if ((document.getElementById("user-login-name").value == "") && (document.getElementById("user-email").value == "")) {
            document.getElementById("validation-message").innerHTML = "Login name or Email is required!"
            return false;
        }
        return true
    }
</script>
<div class="success_message">

    <h2>KEITH BRIDGE FOOD MART<td align="center">
    </h2>
    <h2>3375 Keith Bridge Road</h2>
    <h2>Cumming,GA 30041</h2>
</div>

<div class="content">


    <div class="row">
        <div class="column" style="background-color:#aaa;">

            <form name="frmForgot" id="frmForgot" method="post" onSubmit="return validate_forgot();">
                <h1>Forgot Password?</h1>
                <?php if (!empty($success_message)) { ?>
                    <div class="success_message"><?php echo $success_message; ?></div>
                <?php } ?>

                <div id="validation-message">
                    <?php if (!empty($error_message)) { ?>
                        <?php echo $error_message; ?>
                    <?php } ?>
                </div>

                <div class="field-group">
                    <div><label for="username">Username</label></div>
                    <div><input type="text" name="user-login-name" id="user-login-name" class="input-field"> Or</div>
                </div>

                <div class="field-group">
                    <div><label for="email">Email</label></div>
                    <div><input type="text" name="user-email" id="user-email" class="input-field"></div>
                </div>

                <div class="field-group">
                    <input type="submit" name="forgot-password" id="forgot-password" value="Submit" class="form-submit-button">
                    <a href="../../home.php">Back to Login Page</a>

                </div>


                <?php
                if (!empty($_POST["forgot-password"])) {

                    $dbhost = 'localhost';
                    $dbuser = 'root';
                    $dbpass = '';
                    $dbname = 'jmllcdata';
                    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
                    if (!$conn)
                        die('Could not connect: ' . mysqli_error($mysql));


                    $condition = "";
                    if (!empty($_POST["user-login-name"]))
                        $condition = " phone = '" . $_POST["user-login-name"] . "'";
                    if (!empty($_POST["user-email"])) {
                        if (!empty($condition)) {
                            $condition = " and ";
                        }
                        $condition = "email = '" . $_POST["user-email"] . "'";
                    }

                    if (!empty($condition)) {
                        $condition = " where " . $condition;
                    }

                    $sql = "Select * from businesslogin " . $condition;

                    $result = mysqli_query($conn, $sql);
                    if (mysqli_num_rows($result) > 0) {

                        while ($row = mysqli_fetch_array($result)) {


                            echo '<tr><td align="left">','</td><td align="left">';
                        }
                    } else {
                        $error_message = 'No User Found';
                    }
                }
                ?>


            </form>
        </div>
    </div>
</div>