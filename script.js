$(document).ready(function () {
 //*registration*//
  if ($("#registerForm").length) {
    $("#registerForm").validate({
      rules: {
        fullname: { required: true, minlength: 3 },
        username: { required: true, minlength: 3 },
        email: { required: true, email: true },
        password: { required: true, minlength: 5 },
        confirmPassword: { required: true, equalTo: "#password" }
      },
      messages: {
        fullname: {
          required: "Please enter your full name",
          minlength: "Full name must be at least 3 characters"
        },
        username: {
          required: "Please enter a username",
          minlength: "Username must be at least 3 characters"
        },
        email: {
          required: "Please enter your email",
          email: "Enter a valid email address"
        },
        password: {
          required: "Please enter a password",
          minlength: "Password must be at least 5 characters"
        },
        confirmPassword: {
          required: "Please confirm your password",
          equalTo: "Passwords do not match"
        }
      },
      errorClass: "text-danger",
      errorPlacement: function (error, element) {
        error.insertAfter(element);
      },
      submitHandler: function () {
        let fullname = $("#fullname").val().trim();
        let username = $("#username").val().trim();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();

   
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
          alert("Username already exists. Please choose another.");
          return false;
        }
        users.push({ fullname, username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! You can now login.");
        window.location.href = "login.html"; // redirect to login
      }
    });
  }

 //*login*//
  if ($("#loginForm").length) {
    $("#loginForm").validate({
      rules: {
        username: { required: true },
        password: { required: true }
      },
      messages: {
        username: "Please enter your username",
        password: "Please enter your password"
      },
      errorClass: "text-danger",
      submitHandler: function () {
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        let users = JSON.parse(localStorage.getItem("users") || "[]");
        let found = users.find(u => u.username === username && u.password === password);

        if (found) {
          sessionStorage.setItem("loggedInUser", username);
          window.location.href = "band-landing.html";
        } else {
          if ($("#loginError").length === 0) {
            $("#loginForm").append('<div id="loginError" class="text-danger mt-2">Invalid username or password</div>');
          }
        }
      }
    });
  }

  //*landing*//
  if (window.location.pathname.includes("band-landing.html")) {
    let user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      alert("Please login first!");
      window.location.href = "login.html";
    } else {
      $(".text-title").append(`<p class="lead">Welcome, ${user}!</p>`);
    }
  }

});
