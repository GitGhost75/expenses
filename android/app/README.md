## build apk

## rename apk
C:\Users\mail\develop\projects\expenses\android\app\build\outputs\apk\debug
ren .\app-debug.apk our-expenses-app.apk

## copy apk to server
scp .\our-expenses-app.apk alex@ubuntuserver01:~/upload

## copy apk to nginx html dir
sudo mv our-expenses-app.apk /var/www/html/
