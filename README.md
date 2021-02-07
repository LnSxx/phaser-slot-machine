## Phaser Slot-Machine

## Установка

Установка требует Node Package Manager (npm). Если у Вас его нет, то сначала установите его.
Для работы приложения необходимо запустить локальный сервер, предназначенный для статичных файлов игры.

### Запуск сервера.

1. Перейдите в директорию `/backend`.

2. В текущей директории запустите команду `npm install` 


    Команда устанавливает необходимые зависимости для работы сервера.

3. Запустите команду `node app.js`


    Команда запускает сервер.

4. Убедитесь, что сервер запущен. Откройте в браузере http://localhost:3000. Если Вы видите сообщение *Web server for static files*, значит сервер запущен и можно приступать к сборке и запуску `frontend`.

### Сборка и запуск игры.

1. Перейдите в директорию `/frontend`

2. Запустите команду `npm install`

3. Далее запустите `npm run build`


   Команда собирает приложение в директории `/dist`

4. Собранную игру можно запускать. Откройте файл `index.html`, расположенный в директории `/dist` в вашем браузере.
   






