<!DOCTYPE html>
<html>

<head>

	<script type="text/javascript">
		(function($) {
			$.fn.extend({
				donetyping: function(callback, timeout) {
					timeout = timeout || 500;
					var timeoutReference,
						doneTyping = function(el) {
							if (!timeoutReference) return;
							timeoutReference = null;
							callback.call(el);
						};
					return this.each(function(i, el) {
						var $el = $(el);
						$el.is(':input') && $el.on('keyup keypress', function(e) {
							if (e.type == 'keyup' && e.keyCode != 8) return;
							if (timeoutReference) clearTimeout(timeoutReference);
							timeoutReference = setTimeout(function() {
								doneTyping(el);
							}, timeout);
						}).on('blur', function() {
							doneTyping(el);
						});
					});
				}
			});
		})(jQuery);

		formValidation = {
			init: function() {
				this.$form = $('.registration-form');
				this.$firstName = this.$form.find('input[name="firstName"]');
				this.$lastName = this.$form.find('input[name="lastName"]');
				this.$email = this.$form.find('input[name="email"]');
				this.$password = this.$form.find('input[name="password"]');
				this.$passwordToggle = this.$form.find('button.toggle-visibility');
				this.$submitButton = this.$form.find('button.submit');

				this.validatedFields = {
					firstName: false,
					lastName: false,
					email: false,
					password: false
				};

				this.bindEvents();
			},
			bindEvents: function() {
				this.$firstName.donetyping(this.validateFirstNameHandler.bind(this));
				this.$lastName.donetyping(this.validateLastNameHandler.bind(this));
				this.$email.donetyping(this.validateEmailHandler.bind(this));
				this.$password.donetyping(this.validatePasswordHandler.bind(this));
				this.$passwordToggle.mousedown(this.togglePasswordVisibilityHandler.bind(this));
				this.$passwordToggle.click(function(e) {
					e.preventDefault()
				});
				this.$form.submit(this.submitFormHandler.bind(this));
			},
			validateFirstNameHandler: function() {
				this.validatedFields.firstName = this.validateText(this.$firstName);
			},
			validateLastNameHandler: function() {
				this.validatedFields.lastName = this.validateText(this.$lastName);
			},
			validateEmailHandler: function() {
				this.validatedFields.email = this.validateText(this.$email) && this.validateEmail(this.$email);
			},
			validatePasswordHandler: function() {
				this.validatedFields.password = this.validateText(this.$password) && this.validatePassword(this.$password);
			},
			togglePasswordVisibilityHandler: function() {
				var html = '<input type="text" value="' + this.$password.val() + '">';
				var $passwordParent = this.$password.parent()
				var saved$password = this.$password.detach();
				$passwordParent.append(html);
				this.$passwordToggle.find('span').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
				this.$passwordToggle.one('mouseup mouseleave', (function() {
					$passwordParent.find('input').remove();
					$passwordParent.append(saved$password);
					this.$passwordToggle.find('span').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
				}).bind(this));
			},
			submitFormHandler: function(e) {
				e.preventDefault();
				this.validateFirstNameHandler();
				this.validateLastNameHandler();
				this.validateEmailHandler();
				this.validatePasswordHandler();
				if (this.validatedFields.firstName && this.validatedFields.lastName && this.validatedFields.email && this.validatedFields.password) {
					// Simulate Ajax loading
					this.$submitButton.addClass('loading').html('<span class="loading-spinner"></span>')
					setTimeout((function() {
						this.$submitButton.removeClass('loading').addClass('success').html('Welcome, ' + this.$firstName.val())
					}).bind(this), 1500);
				} else {
					this.$submitButton.text('Please Fix the Errors');
					setTimeout((function() {
						if (this.$submitButton.text() == 'Please Fix the Errors') {
							this.$submitButton.text('Sign Me Up');
						}
					}).bind(this), 3000)
				}
			},

			validateText: function($input) {
				$input.parent().removeClass('invalid');
				$input.parent().find('span.label-text small.error').remove();
				if ($input.val() != '') {
					return true;
				} else {
					$input.parent().addClass('invalid');
					$input.parent().find('span.label-text').append(' <small class="error">(Field is empty)</small>');
					return false;
				}
			},
			validateEmail: function($input) {
				var regEx = /\S+@\S+\.\S+/;
				$input.parent().removeClass('invalid');
				$input.parent().find('span.label-text small.error').remove();
				if (regEx.test($input.val())) {
					return true;
				} else {
					$input.parent().addClass('invalid');
					$input.parent().find('span.label-text').append(' <small class="error">(Email is invalid)</small>');
					return false;
				}
			},
			validatePassword: function($input) {
				$input.parent().removeClass('invalid');
				$input.parent().find('span.label-text small.error').remove();
				if ($input.val().length >= 8) {
					return true;
				} else {
					$input.parent().addClass('invalid');
					$input.parent().find('span.label-text').append(' <small class="error">(Your password must longer than 7 characters)</small>');
					return false;
				}
			}
		}.init();
	</script>

	<style>
		@import url(https://fonts.googleapis.com/css?family=Cookie|Raleway:300,700,400);

		* {
			box-sizing: border-box;
			font-size: 1em;
			margin: 0;
			padding: 0;
		}

		body {
			background-image: url('../images/information2.jpg');
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-position: center;

			//background: url('http://tfgms.com/sandbox/dailyui/bg-1.jpg') center no-repeat;
			//background:img src=images/employee.jpg;
			background-size: cover;
			color: #333;
			font-size: 18px;
			font-family: 'Raleway', sans-serif;
		}

		.container {
			border-radius: 0.5em;
			box-shadow: 0 0 1em 0 rgba(51, 51, 51, 0.25);
			display: block;
			max-width: 480px;
			overflow: hidden;
			-webkit-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			padding: 2em;
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 1;
			width: 98%;
		}

		.container:before {
			background-image: url('images/information1.jpg');
			//background: url('http://tfgms.com/sandbox/dailyui/bg-1.jpg') center no-repeat;
			background-size: cover;
			content: '';
			-webkit-filter: blur(10px);
			filter: blur(10px);
			height: 100vh;
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: -1;
			-webkit-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 100vw;
		}

		.container:after {
			background: rgba(255, 255, 255, 0.6);
			content: '';
			display: block;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
		}

		form button.submit {
			background: rgba(255, 255, 255, 0.25);
			border: 1px solid #333;
			line-height: 1em;
			padding: 0.5em 0.5em;
			-webkit-transition: all 0.25s;
			transition: all 0.25s;
		}

		form button:hover,
		form button:focus,
		form button:active,
		form button.loading {
			background: #333;
			color: #fff;
			outline: none;
		}

		form button.success {
			background: #27ae60;
			border-color: #27ae60;
			color: #fff;
		}

		@-webkit-keyframes spin {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
		}

		@keyframes spin {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
		}

		form button span.loading-spinner {
			-webkit-animation: spin 0.5s linear infinite;
			animation: spin 0.5s linear infinite;
			border: 2px solid #fff;
			border-top-color: transparent;
			border-radius: 50%;
			display: inline-block;
			height: 1em;
			width: 1em;
		}

		form label {
			border-bottom: 1px solid #333;
			display: block;
			font-size: 1.25em;
			margin-bottom: 0.5em;
			-webkit-transition: all 0.25s;
			transition: all 0.25s;
		}

		form label.col-one-half {
			float: left;
			width: 50%;
		}

		form label.col-one-half:nth-of-type(even) {
			border-left: 1px solid #333;
			padding-left: 0.25em;
		}

		form label input {
			background: none;
			border: none;
			line-height: 1em;
			font-weight: 300;
			padding: 0.125em 0.25em;
			width: 100%;
		}

		form label input:focus {
			outline: none;
		}

		form label input:-webkit-autofill {
			background-color: transparent !important;
		}

		form label span.label-text {
			display: block;
			font-size: 0.5em;
			font-weight: bold;
			padding-left: 0.5em;
			text-transform: uppercase;
			-webkit-transition: all 0.25s;
			transition: all 0.25s;
		}

		form label.checkbox {
			border-bottom: 0;
			text-align: center;
		}

		form label.checkbox input {
			display: none;
		}

		form label.checkbox span {
			font-size: 0.5em;
		}

		form label.checkbox span:before {
			content: '\e157';
			display: inline-block;
			font-family: 'Glyphicons Halflings';
			font-size: 1.125em;
			padding-right: 0.25em;
			position: relative;
			top: 1px;
		}

		form label.checkbox input:checked+span:before {
			content: '\e067';
		}

		form label.invalid {
			border-color: #c0392b !important;
		}

		form label.invalid span.label-text {
			color: #c0392b;
		}

		form label.password {
			position: relative;
		}

		form label.password button.toggle-visibility {
			background: none;
			border: none;
			cursor: pointer;
			font-size: 0.75em;
			line-height: 1em;
			position: absolute;
			top: 50%;
			right: 0.5em;
			text-align: center;
			-webkit-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			transform: translateY(-50%);
			-webkit-transition: all 0.25s;
			transition: all 0.25s;
		}

		form label.password button.toggle-visibility:hover,
		form label.password button.toggle-visibility:focus,
		form label.password button.toggle-visibility:active {
			color: #000;
			outline: none;
		}

		form label.password button.toggle-visibility span {
			vertical-align: middle;
		}

		h1 {
			font-size: 3em;
			margin: 0 0 0.5em 0;
			text-align: center;
			font-family: 'Cookie', cursive;
		}

		h1 img {
			height: auto;
			margin: 0 auto;
			max-width: 240px;
			width: 100%;
		}

		html {
			font-size: 18px;
			height: 100%;
		}

		.text-center {
			text-align: center;
		}
	</style>
</head>

<body>

	<div class="container">
		<header>
			<h1>
				<a href="#">
					Employees

					<img src="images/information.jpg" alt="" />


				</a>
			</h1>
		</header>
		<h1 class="text-center">Select Employee and Type Massage</h1>

		<form class="registration-form" method='post'>
			<label class="col-one-half">
				<span class="label-text">Employee</span>

			</label>
			<select name='idno'>
				<?php
				$dbhost = 'localhost';
				$dbuser = 'root';
				$dbpass = '';
				$dbname = 'jmllcdata';

				$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
				if (!$conn)
					die('Could not connect: ' . mysqli_error($mysql));
				$sql = mysqli_query($conn, "SELECT idno,name,phone FROM employee ");
				while ($row = $sql->fetch_assoc()) {
					echo '<option value="' . $row['name'] . '">' . $row['name'] . '</option>';
				}

				?>
			</select>

			<label class="col-one-half">
				<span class="label-text"></span>

			</label>
			<label>
				<span class="label-text">Massage</span>
				<input type="text" name="mass">
			</label>


			<div class="text-center">
				<p><button class="submit" name="submit">submit</button></p>
				<a href="../../frontpage.php">Back to Home</a>
			</div>
		</form>
		<?php

		if (isset($_POST['submit'])) {
			$idno = $_POST['idno'];
			$mass = $_POST['mass'];


			$dbhost = 'localhost';
			$dbuser = 'root';
			$dbpass = '';
			$dbname = 'jmllcdata';

			$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
			if (!$conn)
				die('Could not connect: ' . mysqli_error($mysql));

			$sql = "INSERT INTO massage  (name,mass,ok,date,userid) VALUES ('$idno','$mass','1',now(),(select phone FROM employee where name='$idno'))";


			if (!mysqli_query($conn, $sql)) {
				die('Error: ' . mysqli_error($conn));
			}
			echo '<script type="text/javascript">alert("Massage send successfully");</script>';
		}

		?>
	</div>


</body>

</html>