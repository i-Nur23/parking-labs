var main = () => {
  /*var messages = ["первое сообщение", "второе сообщение", "третье сообщение","четвертое сообщение"];*/
  var slidesInit = [
    {
      src : "../images/slides/matiz.jpg",
      tag : "A"
    },
    {
      src : "../images/slides/spark.jpg",
      tag : "A"
    },
    {
      src : "../images/slides/picanto.jpg",
      tag : "A"
    },
    {
      src : "../images/slides/polo.jpg",
      tag : "B"
    },
    {
      src : "../images/slides/priora.jpg",
      tag : "B"
    },
    {
      src : "../images/slides/golf.jpg",
      tag : "C"
    },
    {
      src : "../images/slides/lancer.jpg",
      tag : "C"
    },
    {
      src : "../images/slides/corolla.jpg",
      tag : "C"
    },
    {
      src : "../images/slides/camry.jpg",
      tag : "D"
    },
  ]

  var slides = slidesInit;
  var stop = false;

  $("select").change(() => {
    var tag = $( "select option:selected" ).text();
    if (tag != "Все"){
      slides = slidesInit.filter(slide => slide.tag == tag);
      displaySlide(0);
      stop = true;
    } else {
      slides = slidesInit;
      displaySlide(0);
      stop = true;
    }
  })

  var displaySlide = (slideIndex) => {
    var $slide = $("<img>").attr('src', slides[slideIndex].src).hide()
    $(".slide").empty();
    $(".slide").append($slide);
    $slide.fadeIn();
    setTimeout(() => {
      slideIndex = slideIndex == slides.length - 1 ? 0 : slideIndex + 1;
      if (!stop){
        displaySlide(slideIndex);
      } else {
        stop = false;
      }
    },2000)
  };

  displaySlide(0);
}
$(document).ready(main);