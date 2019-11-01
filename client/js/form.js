$(function() {
  if (window.location.pathname === "/") {
    $("#tempNormalRegister").attr("hidden", true);
    $(".signup-form").remove();
    $(".login").on("click", login);
    $("#signInTitle").text("Log in");
  }

  if (window.location.pathname === "/register") {
    // $(".login").remove();
    $("#tempOrangeRegister").attr("hidden", true);
    $(".login-form").remove();
    $(".signup").on("click", signup);
  }

  if ($(".logout").length) {
    $(".logout").on("click", logout);
  }
});

function validInput(names) {
  for (let i = 0; i < names.length; i++) {
    if (!$('[name="' + names[i] + '"]').val()) {
      return false;
    }
  }
  return true;
}

function login(e) {
  e.preventDefault();
  if (!validInput(["username", "password"])) return;
  $.ajax("/login", {
    method: "POST",
    data: {
      username: $('[name="username"]').val(),
      password: $('[name="password"]').val()
    }
  })
    .then(({ user, authToken }) => {
      $.cookie("auth_token", authToken.token, { expires: 7 });
      if (!user) throw new Error("invalid username or password");
      window.location.reload();
      console.log("--------------");
      // console.log(user);
      console.log(authToken);
      console.log("--------------");
    })
    .catch(err => alert(err.responseText));
}

function signup(e) {
  e.preventDefault();
  // isEmail($('[name="email"]').val())
  if (!validInput(["username", "password", "email"])) return;
  $.ajax("/register", {
    method: "POST",
    data: {
      username: $('[name="username"]').val(),
      email: $('[name="email"]').val(),
      password: $('[name="password"]').val()
    }
  })
    .then(({ user, authToken }) => {
      if (user && authToken.token) {
        $.cookie("auth_token", authToken.token, { expires: 7 });
        window.location = "/";
      } else {
        throw new Error("something went wrong");
      }
    })
    .catch(err => alert(err.responseText));
}

function logout(e) {
  e.preventDefault();
  $.ajax("/logout", {
    method: "DELETE",
    data: {}
  }).then(user => {
    $.removeCookie("auth_token");
    window.location.reload();
  });
}

// function isEmail(email) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//     alert("Email accepted");
//     console.log("valid email " + email);
//   } else {
//     alert("no way that is an email");
//     console.log("invalid email " + email);
//   }
// }
