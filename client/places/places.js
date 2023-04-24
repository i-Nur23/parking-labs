var main = (places) => {
  "use strict";
  //var places = placesJson;

  var addPlaceClickListener = (li, n) => {
    li.on("click", () => {
      var text = li.text();

      $.ajax({
        url: `${text}`,
        method: 'PATCH',
        /*success: (result) => {
          $.getJSON("places.json", (placesJson) => {
            places = placesJson;
          })
        },*/
        error: (xhr) => {
          console.log(xhr.status + ' ' + xhr.responseText)
        },
        complete : () => {
          $(`.tabs a:nth-child(${n}) span`).trigger("click");
        }
      })
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
        var places;
        $.getJSON('places.json', res => places = res);
        console.log(places)
        $content = $("<ul>");
        places.forEach(place => {
          if (!place.isFree){
            var $listElement = $("<li>").text(place.name).addClass("place");
            addPlaceClickListener($listElement, 1)
            $content.append($listElement);
          }
        })
      } else if ($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        var freePlaces;
        $.getJSON('freePlaces.json', res => freePlaces = res)
        freePlaces.forEach(place => {
          if (place.isFree){
            var $listElement = $("<li>").text(place.name).addClass("place");
            addPlaceClickListener($listElement, 2)
            $content.append($listElement);
          }
        })
      } else if ($element.parent().is(":nth-child(3)")) {
        var organizedByTags;
        $.getJSON('organisedPlaces.json', res => organizedByTags = res);
        $content = $("<ul>");
        organizedByTags.forEach(tag => {
          var $tagsListElement = $("<li>");
          $tagsListElement.append($("<h3>").text(tag.name));
          var $innerList = $("<ul>");
          tag.places.forEach(place => {
            $innerList.append($("<li>").text(place).addClass("place-in-tag"))
          })
          $tagsListElement.append($innerList);
          $content.append($tagsListElement);
        })
      } else if ($element.parent().is(":nth-child(4)")) {
        var
          $input = $("<input>").addClass("place-input"),
          $inputLabel = $("<p>").text("Новое место"),
          $tagInput = $("<input>").addClass("tags"),
          $tagLabel = $("<p>").text("Разрешённые классы авто: "),
          $button = $("<button>").text("+").addClass("btn-add");

        $button.on("click", () => {
          var name = $input.val();
          var tags = $tagInput.val().split(",").map(tag => tag.trim());

          fetch("newPlace", {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name : name, tags : tags})
          }).then(res => res.json().then(data => {
            if (data.success){
              $input.val("");
              $tagInput.val("");
            } else {
              console.log(data.description);
            }
            $.getJSON('places.json', placesJson => places = placesJson);
          }))
        })

       $content = $("<div>")
         .append($inputLabel)
         .append($input)
         .append($tagLabel)
         .append($tagInput)
         .append($button);
      }
      $("main .content").append($content);
      return false;
    })
  })

  $(".tabs a:first-child span").trigger("click")
};

$(document).ready(() => {
  $.ajaxSetup({async : false})
  $.getJSON("places.json", (placesJson) => {
    main(placesJson)
  })
});