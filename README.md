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

docker load -i backend.tar
docker load -i frontend.tar
docker-compose up -d