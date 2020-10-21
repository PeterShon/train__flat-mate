//данный код работает при поддержке следующего ролика https://www.youtube.com/watch?v=PqTrhfjLQBI

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend); //при отправке формы запускается ф-я formSend

   //функция отправки
   async function formSend(e) {
      e.preventDefault(); //запрет стандартной отправки форм

      let error = formValidate(form); //присваивается результат работы функции
      let formData = new FormData(form); //новый массив с данными всех полей

      if (error === 0) {
         //
         document.getElementsByClassName('background--feedback')[0].classList.add('__sending');
         //дальнейший блок кода отправляет сообщение в содружестве с файлом php
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            document.getElementsByClassName('background--feedback')[0].classList.remove('__sending');
         } else {
            alert('Ошибка');
            document.getElementsByClassName('background--feedback')[0].classList.remove('__sending');
         }
      } else {
         alert('Заполните обязательные поля!')
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('.__req') //require - обязательное поле //создаёт объект со всеми элементами с классом обязательности
      //присвоение каждому обязательному объекту определённого результата
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input); //в начале проверки объектов убрать у всех объектов класс '__error'
         //проверка на присутствие класса '__email' у объекта
         if (input.classList.contains('__email')) {
            //если объект имеет ошибку в тексте email, то ему добавляется класс '__error'
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            //проверка заполненности оставшихся полей
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }

   //функции добавляют/убирают класс '__error' себе и родительскому объету
   function formAddError(input) {
      input.parentElement.classList.add('__error');
      input.classList.add('__error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('__error');
      input.classList.remove('__error');
   }
   //Функция теста email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
});