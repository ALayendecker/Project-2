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
        // $.ajax({
        //   url: "/me",
        //   type: "POST"
        // });
        window.location = "/me";
        // console.log("--------------");
        // console.log(user);
        // console.log(authToken);
        // console.log("--------------");
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
          window.location = "/me";
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
  var $taskList = $("#task-list");

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

  $submitBtn.on("click", handleFormSubmit);
  $(document).on("click", ".deleteBoard", handleDeleteBtnClick);
  $(document).on("click", ".addTask", handleTasks);
  $(document).on("click", ".deleteTask", handleTaskDeleteBtnClick);
  // $taskList.on("click", ".deleteTask", handleTaskDeleteBtnClick);
});
