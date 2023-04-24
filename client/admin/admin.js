main = (users) => {
  "use strict"

  var $ul = $("ul.users");
  $ul.empty();

  users.forEach(user => {
    var $li = $("<li>")
    var $infoDiv = $("<div>")
    $infoDiv.append($("<div>").text(`Имя : ${user.username}`))
    $infoDiv.append($("<div>").text(`ID : ${user._id}`))
    $li.append($infoDiv);

    var $button = $("<button>").text("Удалить").addClass("delete");

    $button.on('click', () => {
      var name = $input.val();
      fetch(`users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
      }).then(res => {
        res.json().then(data => {
          if (!data.ok){
            $("p.message").text(data.description)
          } else {
            $("p.message").text("")
            $.getJSON("users.json", (users) => {
              main(users)
            })
          }
        })
      })
    })

    $li.append($button)
    $ul.append($li)
  })

  var $addingLi = $("<li>")
  var $inputDiv = $("<div>")
  $inputDiv.append($("<div>").text("Имя: "))
  var $input = $("<input>").addClass("name-input")
  $inputDiv.append($input)
  $addingLi.append($inputDiv);
  var $button = $("<button>").text("Добавить").addClass("add");

  $button.on('click', () => {
    var name = $input.val();
    fetch(`users?name=${name}`, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
    }).then(res => {
      res.json().then(data => {
        if (!data.ok){
          $("p.message").text(data.description)
        } else {
          $("p.message").text("")
          $.getJSON("users.json", (users) => {
            main(users)
          })
        }
      })
    })
  })

  $addingLi.append($button)
  $ul.append($addingLi)

}

$(document).ready(() => {
  $.ajaxSetup({async : false})
  $.getJSON("users.json", (users) => {
    main(users)
  }).fail(jqXHR => {
    if (jqXHR.status == 403) {
      window.location.href = "../index.html";
    } else {
      alert("Other non-handled error type");
    }
  });
});