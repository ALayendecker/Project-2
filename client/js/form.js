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

  function validInput(names) {
    for (let i = 0; i < names.length; i++) {
      if (!$('[name="' + names[i] + '"]').val()) {
        $("#formHeader").html(
          "<p style='color: red'>Please enter all fields.</p>"
        );
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
      .then(data => {
        // console.log(data);
        if (data === "error from user controller") {
          $("#formHeader").html(
            "<p style='color: red'>Invalid Username or Password</p>"
          );
        } else {
          console.log("it works fine");
          $.cookie("auth_token", data.authToken.token, { expires: 7 });
          if (!data.user) throw new Error("invalid username or password");
          // $.ajax({
          //   url: "/me",
          //   type: "POST"
          // });
          window.location = "/me";
          // console.log("--------------");
          // console.log(user);
          // console.log(authToken);
          // console.log("--------------");
        }
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
      .then(data => {
        if (data === "error from user controller register") {
          $("#formHeader").html(
            "<p style='color: red'>User already exists or you have an invalid input please try again</p>"
          );
          // alert(
          //   "User already exists or you have an invalid input please try again"
          // );
        } else {
          $.cookie("auth_token", data.authToken.token, { expires: 7 });
          window.location = "/me";
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
      window.location = "/";
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

  // -----public-----

  var $boardText = $("#board-text");
  var $submitBtn = $("#submit");

  var taskAPI = {
    saveTask: function(task) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/tasks",
        data: JSON.stringify(task)
      });
    },
    getTasks: function() {
      return $.ajax({
        url: "api/tasks",
        type: "GET"
      });
    },
    deleteTask: function(id) {
      return $.ajax({
        url: "api/tasks/" + id,
        type: "DELETE"
      });
    }
  };

  var API = {
    saveBoard: function(board) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/boards",
        data: JSON.stringify(board)
      });
    },
    getBoards: function() {
      return $.ajax({
        url: "api/boards",
        type: "GET"
      });
    },
    deleteBoard: function(id) {
      return $.ajax({
        url: "api/boards/" + id,
        type: "DELETE"
      });
    }
  };

  var refresh = function() {
    location.reload();
  };

  var handleFormSubmit = function(event) {
    event.preventDefault();
    console.log($boardText.val().trim());
    var board = {
      text: $boardText.val().trim()
    };

    API.saveBoard(board).then(function() {
      refresh();
    });

    $boardText.val("");
  };

  var handleTasks = function(event) {
    event.preventDefault();

    var task = {
      text: $("input[data-id='" + this.id + "']")
        .val()
        .trim(),
      BoardId: $(this)[0].id
    };
    taskAPI.saveTask(task).then(function() {
      refresh();
    });

    $("input[data-id='" + this.id + "']").val("");
  };

  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteBoard(idToDelete).then(function() {
      refresh();
    });
  };

  var handleTaskDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    taskAPI.deleteTask(idToDelete).then(function() {
      refresh();
    });
  };

  var array = [];

  function updateSuccess () {
    $("#showSubmit").text(`Username updated successfully to ${$("#newUsername").val()}!`);
    $("#currentUsername").val("");
    $("#newUsername").val("");
  }

  function updateFail () {
    $("#showSubmit").text(`Update unsuccessful. Your input was: ${$("#currentUsername").val()}.`);
    $("#currentUsername").val("");
    $("#newUsername").val("");
  }

  function waitForIt() {
    if (array.indexOf("Success!") === -1) {
      updateFail();
    }
  }


  function updateUsername() {

    $.ajax({
      method: "PUT",
      url: "/changeUsername/",
      data: {
        currentUsername: $("#currentUsername")
          .val()
          .trim(),
        newUsername: $("#newUsername")
          .val()
          .trim()
      },
      success: function(){
        updateSuccess();
        array.push("Success!")
     },
    })

    setTimeout(waitForIt, 100);
    
  };

  $submitBtn.on("click", handleFormSubmit);
  $(document).on("click", ".deleteBoard", handleDeleteBtnClick);
  $(document).on("click", ".addTask", handleTasks);
  $(document).on("click", ".deleteTask", handleTaskDeleteBtnClick);
  $("#updateUsername").on("click", updateUsername);
});
