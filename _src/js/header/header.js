//получение объектов
var header = document.querySelectorAll('.__anim');
var logo_wheel = document.querySelector('.logo__rails');
var start = document.querySelector('#start');
//вызов функции, добавляющей функции в объект
setFunc(header);
//обработка события onScroll
window.addEventListener('scroll', function () {
   if (document.documentElement.clientWidth * 0.105 > window.scrollY) {
      header.forEach(i => i.shower());
   } else {
      header.forEach(i => i.hider());
   }
})
//обработка события onClick
logo_wheel.addEventListener('click', (e) => {
   //обработка кода по условию "если есть скролл"
   if (window.scrollY) {
      logo_wheel.classList.toggle('__mini');
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }
})

//изменение статуса объекта
function fz_hider() {
   this.classList.add('__mini');
}
function fz_shower() {
   this.classList.remove('__mini');
}
//запись функций в каждый анимируемый объект
function setFunc(header) {
   for (let i = 0; i < header.length; i++) {
      header[i].hider = fz_hider;
      header[i].shower = fz_shower;
   }
}