var main = (placesJson) => {
  "use strict";
  var places = placesJson;
  var organizeByTags = (placesList) => {
    var arrayOfTags = [];
    placesList.forEach(place => {
      place.tags.forEach(tag => {
        if (arrayOfTags.indexOf(tag) == -1) {
          arrayOfTags.push(tag)
        }
      })
    })

    var tagObjects = arrayOfTags.map(tag => {
      var tagPlaces = [];
      placesList.forEach(place => {
        if (place.tags.indexOf(tag) !== -1) {
          tagPlaces.push(place.name)
        }
      });
      return {"name" : tag, "places" : tagPlaces};
    })

    return tagObjects;
  }

  var addPlaceClickListener = (li, n) => {
    li.on("click", () => {
      var text = li.text();
      var new_places = places.map(place => {
        if (place.name === text){
          place.isFree = !place.isFree;
        }

        return place;
      });
      places = new_places;
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
        places.forEach(place => {
          if (!place.isFree){
            var $listElement = $("<li>").text(place.name).addClass("place");
            addPlaceClickListener($listElement, 1)
            $content.append($listElement);
          }
        })
      } else if ($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        places.forEach(place => {
          if (place.isFree){
            var $listElement = $("<li>").text(place.name).addClass("place");
            addPlaceClickListener($listElement, 2)
            $content.append($listElement);
          }
        })
      } else if ($element.parent().is(":nth-child(3)")) {
        var organizedByTags = organizeByTags(places);
        console.log(organizedByTags)
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
          places.push({"name" : name, "isFree" : 1, "tags" : tags})
          $input.val("");
          $tagInput.val("");
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
  $.getJSON("../data/places.json", (placesJson) => {
    main(placesJson)
  })
});