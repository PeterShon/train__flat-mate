$(document).ready(function () {
   $('.slick').slick({
      vertical: false,
      verticalSwiping: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      speed: 300,
      focusOnSelect: true,
      //autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      initialSlide: 2,
      //adaptiveHeight: true
   });
})