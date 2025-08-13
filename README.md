# expenses
dealing with expenses


# react

## create react app
npx create-react-app frontend

## start react
npm run

## kill running react processes
tasklist | findstr node
taskkill /F /IM node.exe

# docker
docker-compose build
docker save -o ./target/backend.tar expenses-backend
docker save -o ./target/frontend.tar expenses-frontend
scp ./target/*.tar alex@ubuntuserver01:~/upload

docker-compose down
docker load -i backend.tar
docker load -i frontend.tar
docker-compose up -d

## show db in docker container
docker exec -it expenses-mariadb mariadb -u root -p
show dbs: show databases;
use db: use <<db>>;
table description: describe <<table>>;

## local db
docker run -d --name expenses_db_local -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=expensesdb -p 3308:3306 mariadb:latest
## local db phpmyadmin
docker run -d --name=expenses-db-admin -p=9000:80 -e PMA_HOST=host.docker.internal -e PMA_PORT=3308 phpmyadmin/phpmyadmin:latest

