var main = function () {
  "use strict";
  var places = [
    [ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 0, 1, 1, 1, 1, 1, 1 ]
  ]
  $(".tabs a span").toArray().forEach(element => {
    $(element).on("click", () => {
      var $element = $(element),
      $content
      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      $("main .content").empty();
      if ($element.parent().is(":nth-child(1)")){
        $content = $("<ul>");
        for (let i = 0; i < places.length; i ++){
          for (let j = 0; j < places[i].length; j ++){
            if (!places[i][j]){
              $content.append($("<li>").text(`${String.fromCharCode(65 + i)}${j+1}`));
            }
          }
        }
      } else if ($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        for (let i = 0; i < places.length; i ++){
          for (let j = 0; j < places[i].length; j ++){
            if (places[i][j]){
              $content.append($("<li>").text(`${String.fromCharCode(65 + i)}${j+1}`));
            }
          }
        }
      }
      $("main .content").append($content);
      return false;
    })
  })
};

$(document).ready(main);