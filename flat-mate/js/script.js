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
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      initialSlide: 2
   });
})
// загрузка кода JavaScript API проигрывателя IFrame
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//создание объекта проигрывания видео
var player;
function onYouTubeIframeAPIReady() {
   player = new YT.Player('js_player__window', {
      height: '100%',
      width: '100%',
      videoId: 'EQo2nE85gcc',
      playerVars: {
         'autoplay': 0,
         'controls': 0,
         'showinfo': 0,
         'rel': 0,
         'autohide': 1
      },
      events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
      }
   });
}

// API будет вызвано этой функцией, когда видео плеер будет готов
function onPlayerReady(event) {
   //event.target.playVideo();
}

//Отслеживание состояния проигрывателя. В данном случае, когда видео проигрывается, то спустя 6 секунд видео останавливается
function onPlayerStateChange(event) {

}
////кастомные функции

//функции паузы и проигрывания
function stopVideo() {
   player.stopVideo();
};
function playVideo() {
   player.playVideo();
};

//плей-пауз-функция
function onClick() {
   if (player.getPlayerState() == 1) {
      js_player__panel.classList.remove('hide');
      stopVideo();
   } else {
      js_player__panel.classList.add('hide');
      playVideo();
   }
};
var js_player__panel = document.getElementById('js_player__panel');
//управление бэкграундом
function bgHide(playStatus) {
   if (playStatus == 1) {
      js_player__panel.classList.add('hide');
   } else {
      js_player__panel.classList.remove('hide');
   }
}