//ЗАПУСК
1. Открыть терминал в этой папке;
2. Команда "npm i";
3. Запуск командой "gulp".

//ПЕРЕЗАПУСК (полная очистка пакетного менеджера)
1. Открыть терминал в этой папке;
2. Команда "npm cache clean --force";
3. Команда "npm i npm -g"

//для восстановления проекта нужны папка '_src', файлы package.json и gulpfile.js
//подключение файлов по команде @@include('_header.html')
//html файлы отличные от index.html пишутся через нижнее подчёркивание

//сценарий собран при поддержке ролика по ссылке: https://youtu.be/stFOy0Noahg

//ОШИБКИ
1. Не оставлять тег img пустым
TypeError in plugin 'gulp-webp-css'
Message:
    Cannot read property '0' of null