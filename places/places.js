var main = function () {
  "use strict";
  var places = [
    [ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 0, 1, 1, 1, 1, 1, 1 ]
  ]

  var addPlaceClickListener = (li, n) => {
    li.on("click", () => {
      var row = li.attr('row');
      var col = li.attr('col');
      places[row][col] = !places[row][col];
      $(`.tabs a:nth-child(${n}) span`).trigger("click")
    })
  }

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
              var $listElement = $("<li>").attr({ row : i, col : j}).text(`${String.fromCharCode(65 + i)}${j+1}`).addClass("place");
              addPlaceClickListener($listElement, 1)
              $content.append($listElement);
            }
          }
        }
      } else if ($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        for (let i = 0; i < places.length; i ++){
          for (let j = 0; j < places[i].length; j ++){
            if (places[i][j]){
              var $listElement = $("<li>").attr({ row : i, col : j}).text(`${String.fromCharCode(65 + i)}${j+1}`).addClass("place");
              addPlaceClickListener($listElement, 2)
              $content.append($listElement);
            }
          }
        }
      }
      $("main .content").append($content);
      return false;
    })
  })

  $(".tabs a:first-child span").trigger("click")
};

$(document).ready(main);